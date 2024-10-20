const Query = require('./query.mjs');
const Utils = require('./utils.mjs');
const $ = require('jquery');

class PlotReader {
    path;
    options;
    validLocalization = {CN: true, TW: true, EN: true, JP: true, KR: true, TH: true};
    titleList;
    entryPoint;
    mappings;
    groups;
    playState = 0; // 0 未激活，1 正在播放，2 等待用户输入，3 当前入点剧情播放已结束
    nextGID;

    constructor(path, options) {
        this.path = path;
        this.options = options;
    }

    async load() {
        try {
            this.titleList = [];
            this.entryPoint = [];
            this.mappings = new Map();
            this.groups = new Map();
            await $.getJSON(this.path, (data) => {
                $.each(data, (key, info) => {
                    if (key === 'title') {
                        for (let i in info) {
                            this.titleList.push(info[i]);
                        }
                    }
                    if (key === 'content') {
                        for (let i in info) {
                            if (info[i]['MessageCondition'] === 'FavorRankUp') {
                                this.entryPoint.push(info[i]);
                            }
                            this.mappings.set(info[i]['Id'], info[i]);
                            if (this.groups.has(info[i]['MessageGroupId'])) {
                                let cur = [...this.groups.get(info[i]['MessageGroupId']), info[i]];
                                this.groups.set(info[i]['MessageGroupId'], cur);
                            } else {
                                this.groups.set(info[i]['MessageGroupId'], [info[i]]);
                            }
                        }
                    }
                });
            });
            console.log(this.groups);
        } catch (e) {
            throw new Error(e);
        }
    }

    play(entry) {
        this.load().then(async () => {
            if (entry >= this.entryPoint.length) {
                throw new Error(`Requesting for entrypoint #${entry} out of bound [0,${this.entryPoint.length - 1}]!`);
            }
            this.nextGID = this.entryPoint[entry]['MessageGroupId'];
            await this.resume(false);
            console.log("Over");
        });
    }

    async resume(flag, GID = this.nextGID) {
        console.log("Resuming...");
        if (flag) console.log("Resume from click");
        return new Promise(async (resolve, reject) => {
            if (this.playState !== 2 && this.playState !== 0) {
                console.warn(`Cannot resume playing. Player status is ${this.playState}`);
                reject(GID);
            }
            this.cleanup(GID);
            await this.playPart(this.nextGID).then(res => {
                this.nextGID = res[0];
                this.playState = 2;
                for (let i of res[1]) {
                    document.getElementById(`button ${i['Id']}`).addEventListener("click", () => {this.resume(true, i['NextGroupId'])});
                }
            });
            resolve(GID);
        });
    }

    async playPart(id) {
        this.playState = 1;
        let that = this
        return new Promise(async resolve => {
            let curGroup = that.groups.get(id);
            let nxtGroup = that.groups.get(curGroup[curGroup.length - 1]['NextGroupId']);
            let lastMID = 0;
            while (curGroup[0]['MessageCondition'] !== 'Answer') {
                await that.addGroup(curGroup).then(res => {
                    lastMID = res;
                    curGroup = nxtGroup;
                    nxtGroup = that.groups.get(curGroup[curGroup.length - 1]['NextGroupId']);
                });
            }
            let ret = that.addOptions(curGroup);
            resolve(ret);
        });
    }

    async addGroup(group) {
        return new Promise(async resolve => {
            let container = document.getElementById("container");
            let ret = 0;
            let GID = group[0]['MessageGroupId'];
            container.innerHTML += `<div class="unit ${GID}"><img class="avatar" src="./assets/20039/20039.webp" alt="1"><div class="box" id="box ${GID}"><div data-place class="student group">妃咲</div></div></div>`
            for (let child of group) {
                ret = child['Id'];
                let box = document.getElementById(`box ${GID}`);
                box.innerHTML += `<div data-round class="message group textbox"><span class="text" id="${child['Id']}">……</span></div>`;
                await Utils.Utils.sleep(child['FeedbackTimeMillisec']);
                let inner = document.getElementById(`${child['Id']}`);
                inner.innerHTML = `${child['MessageCN']}`;
                await Utils.Utils.sleep(100);
            }
            resolve(ret);
        });
    }

    addOptions(group) {
        //return new Promise(async function () {
        let container = document.getElementById("container");
        let ret = 0;
        let GID = group[0]['MessageGroupId'];
        container.innerHTML += `<div class="unit ${GID}"><div class="reply"><div class="info"><span class="status">回复</span></div><div class="selector ${GID}" id="selector ${GID}"></div></div></div>`;
        let selector = document.getElementById(`selector ${GID}`);
        for (let child of group) {
            ret = child['NextGroupId'];
            selector.innerHTML += `<div data-unselected class="button ${child['Id']}" id="button ${child['Id']}">${child['MessageCN']}</div>`;
        }
        this.playState = 2;
        return [ret, group];
        //});
    }

    cleanup(id) {
        if (id === this.nextGID) return;
        let flag = false;
        let found = false;
        for (let cur of this.mappings.values()) {
            if (cur['Id'] === id) {
                let flag1 = true;
                found = true;
                for (let i = 1; i < this.groups[cur['MessageGroupId']].length; i++) {
                    if (this.groups[cur['MessageGroupId']][i]['NextGroupId'] !== this.groups[cur['MessageGroupId']][i - 1]['NextGroupId']) {
                        flag1 = false;
                        break;
                    }
                }
                if (flag1) return;
            }
            if (found) {
                if (flag && cur['MessageCondition'] === 'FavorRankUp') return;
                else flag = true;
                let box = document.getElementById(`unit ${cur['Id']}`);
                document.getElementById("container").removeChild(box);
            }
        }
    }

    setClicked(id) {
        let buttonBox = document.getElementById(`selector ${id}`);
        if (buttonBox === undefined) throw new Error(`Button container ${id} not found!`);
        this.cleanup(id);

    }
}

exports.PlotReader = PlotReader;
