import {Utils} from './utils.cjs';
import $ from 'jquery';

class PlotReader {
    path;
    options;
    validLocalization = {CN: true, TW: true, EN: true, JP: true, KR: true, TH: true};
    titleList;
    entryPoint;
    mappings;
    groups;
    playState = 0; // 0 未激活，1 正在播放，2 等待用户输入，3 当前入点剧情播放已结束，4 全剧情播放结束
    nextGID;
    currentEntry;

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
            this.currentEntry = this.entryPoint[entry]['MessageGroupId'];
            await this.resume();
        });
    }

    markAsClicked(GID, oBID, nBID) {
        let buttonGroup = document.getElementById(`selector ${GID}`);
        if (buttonGroup !== null) {
            document.getElementById(`button ${nBID}`).removeAttribute('data-unselected');
            document.getElementById(`button ${nBID}`).setAttribute('data-selected', '');
            if (oBID !== -1) {
                document.getElementById(`button ${oBID}`).removeAttribute('data-selected');
                document.getElementById(`button ${oBID}`).setAttribute('data-unselected', '');
            }
        }
    }

    async resume(flag = false, GID = this.nextGID) {
        return new Promise(async (resolve, reject) => {
            if (this.playState !== 2 && this.playState !== 0) {
                console.warn(`Cannot resume playing. Player status is ${this.playState}`);
                reject(GID);
            }
            await this.playPart(this.nextGID).then(res => {
                this.nextGID = res[0];
                this.playState = 2;

                for (let i of res[1]) {
                    document.getElementById(`button ${i['Id']}`).addEventListener("click", () => {
                        let oBID = this.findStateClicked(i['MessageGroupId']);
                        this.cleanup(i['MessageGroupId'], oBID, i['Id']);
                        this.markAsClicked(i['MessageGroupId'], oBID, i['Id']);
                        this.resume(true, i['NextGroupId']);
                    });
                }
            });
            resolve(GID);
        });
    }

    findStateClicked(GID) {
        let ret = -1;
        for (let child of this.groups.get(GID)) {
            if (document.getElementById(`button ${child['Id']}`).hasAttribute('data-selected')) {
                ret = child['Id'];
                break;
            }
        }
        return ret;
    }

    async playPart(id) {
        this.playState = 1;
        let that = this
        return new Promise(async resolve => {
            let curGroup = that.groups.get(id);
            let nxtGroup = that.groups.get(curGroup[curGroup.length - 1]['NextGroupId']);
            let lastMID = 0;
            while (curGroup[0]['MessageCondition'] !== 'Answer') {
                if (curGroup[0]['MessageCondition'] === 'FavorRankUp' && curGroup[0]['MessageGroupId'] !== this.currentEntry) break;
                await that.addGroup(curGroup).then(res => {
                    lastMID = res;
                    curGroup = nxtGroup;
                    nxtGroup = that.groups.get(curGroup[curGroup.length - 1]['NextGroupId']);
                });
            }
            let ret;
            if (curGroup[0]['MessageCondition'] === 'Answer') ret = this.addOptions(curGroup);
            resolve(ret);
        });
    }

    async addGroup(group) {
        return new Promise(async resolve => {
            let container = document.getElementById("container");
            let ret = 0;
            let GID = group[0]['MessageGroupId'];
            // const DOM = new DOMParser().parseFromString(`<div class="unit"><img class="avatar" src="./assets/20039/20039.webp" alt="1"><div class="box" id="box ${GID}"><div data-place class="student group">妃咲</div></div></div>`, "text/xml");
            // container.appendChild(DOM.documentElement);
            container.insertAdjacentHTML("beforeend", `<div class="unit" id="unit ${GID}"><img class="avatar" src="./assets/20039/20039.webp" alt="1"><div class="box" id="box ${GID}"><div data-place class="student group">妃咲</div></div></div>`);
            for (let child of group) {
                ret = child['Id'];
                let box = document.getElementById(`box ${GID}`);
                // const INNER_DOM = new DOMParser().parseFromString(`<div data-round class="message group textbox"><span class="text" id="${child['Id']}">……</span></div>`, "text/xml");
                // box.appendChild(INNER_DOM.documentElement);
                box.insertAdjacentHTML("beforeend", `<div data-round class="message group textbox"><span class="text" id="${child['Id']}">……</span></div>`);
                await Utils.sleep(child['FeedbackTimeMillisec'] * (this.options['FAST_MODE'] ? 0.1 : 1.0));
                let inner = document.getElementById(`${child['Id']}`);
                inner.innerHTML = `${child['MessageCN']}`;
                await Utils.sleep(100);
            }
            resolve(ret);
        });
    }

    addOptions(group) {
        //return new Promise(async function () {
        let container = document.getElementById("container");
        let ret = 0;
        let GID = group[0]['MessageGroupId'];
        container.insertAdjacentHTML("beforeend", `<div class="unit" id="unit ${GID}"><div class="reply"><div class="info"><span class="status">回复</span></div><div class="selector" id="selector ${GID}"></div></div></div>`);
        // const DOM = new DOMParser().parseFromString(`<div class="unit" id="unit ${GID}"><div class="reply"><div class="info"><span class="status">回复</span></div><div class="selector" id="selector ${GID}"></div></div></div>`, "text/xml");
        // container.appendChild(DOM.documentElement);
        let selector = document.getElementById(`selector ${GID}`);
        for (let child of group) {
            ret = child['NextGroupId'];
            // const INNER_DOM = new DOMParser().parseFromString(`<div data-unselected class="button" id="button ${child['Id']}">${child['MessageCN']}</div>`, "text/xml");
            // selector.appendChild(INNER_DOM.documentElement);
            selector.insertAdjacentHTML("beforeend", `<div data-unselected class="button" id="button ${child['Id']}">${child['MessageCN']}</div>`);
        }
        this.playState = 2;
        return [ret, group];
        //});
    }

    cleanup(GID, oBID, nBID) {
        if (oBID === -1 || oBID === nBID) return;
        if (this.mappings.get(oBID)['NextGroupId'] !== this.mappings.get(nBID)['NextGroupId']) {
            let cur = document.getElementById(`unit ${GID}`);
            while (true) {
                if (cur.nextElementSibling === null) break;
                cur.nextElementSibling.remove();
            }
        }
    }
}

export {
    PlotReader
}
