const Spine = require('pixi-spine');
const PIXI = require('pixi.js');
const CONSTANTS = require('./constants.mjs');

class Player {
    app;
    src;
    baseUrl
    model;
    options;
    audio;
    playerInfo = {debug: false, hasDefault: true, mute: false};
    isPlaying = false;

    constructor(options, src = './assets/Azusa_home/Azusa_home.skel') {
        document.title = `Playing - ${src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'))}`;
        this.src = src;
        this.baseUrl = src.substring(0, src.lastIndexOf('/') + 1);
        this.moveConfigs(options);
    }

    setup() {
        let width = this.options['width'], height = this.options['width'] * this.options['ratio'];
        this.app = new PIXI.Application({
            width: width,
            height: height,
            autoDensity: true
        });
        document.body.appendChild(this.app.view);
    }

    moveConfigs(options) {
        this.options = {
            width: 1920,
            mute: false,
            debug: false,
            noRepeat: false,
            animation: 'idle_01',
            ratio: 1080 / 1920,
            fixed: false
        }
        if (options.get('fixed') !== null) this.options['fixed'] = true;
        if (options.get('width') !== null) this.options['width'] = options.get('width');
        if (options.get('ratio') !== null) this.options['ratio'] = options.get('ratio');
        if (options.get('mute') !== null) this.options['mute'] = options.get('mute');
        if (options.get('noRepeat') !== null) this.options['noRepeat'] = options.get('noRepeat');
        if (options.get('animation') !== null) this.options['animation'] = options.get('animation');
    }

    getCanvasArguments() {
        let ret = {scale: 1, scaleX: 1, scaleY: 1, x: 0, y: 0};
        // 经验参数，理论上可以二分出更佳选项，总之比值等于 0.625 (1920 : 3072)
        ret['scaleX'] = this.app.renderer.width / 3200;
        ret['scaleY'] = this.app.renderer.height / 2000;
        ret['scale'] = Math.max(ret['scaleX'], ret['scaleY']);
        ret['x'] = this.app.renderer.width / 2;
        ret['y'] = this.app.renderer.height;
        return ret;
    }

    resize() {
        if (window.innerWidth < this.options['width']) {
            this.app.renderer.resize(window.innerWidth, window.innerWidth * this.options['ratio']);
        } else {
            this.app.renderer.resize(this.options['width'], this.options['width'] * this.options['ratio']);
        }
        let args = this.getCanvasArguments();
        console.log(args);
        this.model.scale.set(args['scale']);
        this.model.x = args['x'];
        this.model.y = args['y'];
        this.app.stage.addChild(this.model);
    }

    async play() {
        this.cleanup();
        const data = await PIXI.Assets.load(this.src);
        this.model = new Spine.Spine(data.spineData);
        console.log(`Version: ${this.model.state.data.skeletonData.version}\nWidth: ${this.model.spineData.width}\nHeight: ${this.model.spineData.height}\nRatio: ${this.model.spineData.width / this.model.spineData.height}`);
        console.log(this.model);
        this.setup();
        const animation = this.model.state.data.skeletonData.animations;
        let defaultAni = "";
        let idx = 0;
        for (let i in animation) {
            if (animation[i].name.toLowerCase() === this.options['animation'].toLowerCase()) {
                defaultAni = animation[i].name;
                idx = i;
            }
        }

        if (defaultAni.length > 0) {
            this.model.state.setAnimation(1, defaultAni, !this.options['noRepeat']);
        } else {
            this.model.state.setAnimation(0, animation[0].name, !this.options['noRepeat']);
            this.playerInfo.hasDefault = false;
        }

        this.resize();
        const debounce = (callback, delay) => {
            let interval;
            return function() {
                if (interval) {
                    clearTimeout(interval);
                }
                interval = setTimeout(() => {callback()}, delay);
            }
        };
        const debouncer = debounce(this.resize.bind(this), 100);
        addEventListener("resize", debouncer);

        this.isPlaying = true;
        return this.model;
    }

    cleanup() {
        this.clientWidth = 0;
        this.clientHeight = 0;
        if (this.app !== undefined) this.app.stage.removeChild(this.model);
        if (this.model !== undefined) this.model.destroy();
    }
}

exports.Player = Player;
