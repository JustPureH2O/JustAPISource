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
    playState = 0; // 0 未激活，1 正在播放，2 等待用户输入，3 当前入点剧情播放已结束
    nextGID;
    currentEntry;
    entry;

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
                            if (info[i]['TextCn'].length === 0) this.validLocalization['CN'] = false;
                            if (info[i]['TextTw'].length === 0) this.validLocalization['TW'] = false;
                            if (info[i]['TextEn'].length === 0) this.validLocalization['EN'] = false;
                            if (info[i]['TextJp'].length === 0) this.validLocalization['JP'] = false;
                            if (info[i]['TextKr'].length === 0) this.validLocalization['KR'] = false;
                            if (info[i]['TextTh'].length === 0) this.validLocalization['TH'] = false;
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
            if (this.validLocalization[this.options['LANG']] === undefined || !this.validLocalization[this.options['LANG']]) {
                console.warn(`Invalid language key or unsupported translation ${this.options['LANG']}! Switched to JP`);
                this.options['LANG'] = 'JP';
            }
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
            this.entry = entry;
            await this.resume().catch((GID) => this.cleanup(GID, 1, 2, true));
        });
    }

    markAsClicked(GID, oBID, nBID) {
        if (oBID === nBID) return;
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
                this.nextGID = res === undefined ? this.entry === this.entryPoint.length - 1 ? 0 : this.entryPoint[this.entry + 1] : res[0];
                this.playState = 2;

                if (res !== undefined) {
                    for (let i of res[1]) {
                        document.getElementById(`button ${i['Id']}`).addEventListener("click", () => {
                            if (this.playState !== 1) {
                                let oBID = this.findStateClicked(i['MessageGroupId']);
                                let res = this.cleanup(i['MessageGroupId'], oBID, i['Id']);
                                this.markAsClicked(i['MessageGroupId'], oBID, i['Id']);
                                if (res) this.resume(true, i['NextGroupId']).catch((GID) => this.cleanup(GID, 1, 2, true));
                            }
                        });
                    }
                } else this.drawFooterWidgets();
            });
            resolve(GID);
        });
    }

    drawFooterWidgets() {
        let container = document.getElementById('container');
        if (this.nextGID) {
            container.insertAdjacentHTML("beforeend", `<div class="end"><span class="endtxt">To Be Continued ${this.entry + 1}/${this.entryPoint.length}</span></div>`);
        } else {
            container.insertAdjacentHTML("beforeend", `<div class="end"><span class="endtxt">The End</span></div>`);
        }
        container.insertAdjacentHTML("beforeend", `<div class="footer" id="footer"></div>`);
        let footer = document.getElementById('footer');
        let baseURL = window.location.origin + window.location.pathname;
        let params = new URLSearchParams(window.location.search);
        if (this.entry > 0) {
            if (params.get('entry') !== null) params['entry'] = this.entry - 1;
            else params.append('entry', this.entry - 1);
            footer.insertAdjacentHTML("beforeend", `<div data-left class="suitable-button" onclick="window.location.href='${baseURL+'?'+params.toString()}'">上一幕 ${this.titleList[this.entry - 1][`Text${Utils.toUpperCamel(this.options['LANG'])}`]}</div>`);
        }
        if (this.entry < this.entryPoint.length - 1) {
            if (params.get('entry') !== null) params['entry'] = this.entry + 1;
            else params.append('entry', this.entry + 1);
            console.log(Utils.toUpperCamel(this.options['LANG']));
            footer.insertAdjacentHTML("beforeend", `<div data-right class="suitable-button" onclick="window.location.href='${baseURL+'?'+params.toString()}'">下一幕 ${this.titleList[this.entry + 1][`Text${Utils.toUpperCamel(this.options['LANG'])}`]}</div>`);
        }
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
            let flag = true, flag1 = true;
            let tmp;
            while (curGroup[0]['MessageCondition'] !== 'Answer') {
                if (curGroup[0]['MessageCondition'] === 'FavorRankUp' && curGroup[0]['MessageGroupId'] !== this.currentEntry) break;
                if (parseInt(curGroup[curGroup.length - 1]['FavorScheduleId']) !== 0) flag = false;
                await that.addGroup(curGroup).then(res => {
                    if (nxtGroup !== undefined) {
                        if (!flag) tmp = curGroup;
                        lastMID = res;
                        curGroup = nxtGroup;
                        nxtGroup = that.groups.get(curGroup[curGroup.length - 1]['NextGroupId']);
                    }
                });
                if (!flag || nxtGroup === undefined) break;
            }
            let ret;
            if (curGroup[0]['MessageCondition'] === 'Answer') ret = this.addOptions(curGroup);
            if (!flag) ret = this.addStory(tmp);
            resolve(ret);
        });
    }

    async addGroup(group) {
        return new Promise(async resolve => {
            let container = document.getElementById("container");
            let ret = 0;
            let GID = group[0]['MessageGroupId'];
            container.insertAdjacentHTML("beforeend", `<div class="unit" id="unit ${GID}"><img class="avatar" src="./assets/20039/20039.webp" alt="1"><div class="box" id="box ${GID}"><div data-place class="student group">妃咲</div></div></div>`);
            for (let child of group) {
                ret = child['Id'];
                let box = document.getElementById(`box ${GID}`);
                box.insertAdjacentHTML("beforeend", `<div data-round class="message group textbox"><span class="text" id="${child['Id']}">……</span></div>`);
                await Utils.sleep(child['FeedbackTimeMillisec'] * (1.0 / parseFloat(this.options['SPEED'])));
                let inner = document.getElementById(`${child['Id']}`);
                inner.innerHTML = `${child[`Message${this.options['LANG']}`]}`;
                await Utils.sleep(100);
            }
            resolve(ret);
        });
    }

    addOptions(group) {
        let container = document.getElementById("container");
        let ret = 0;
        let GID = group[0]['MessageGroupId'];
        container.insertAdjacentHTML("beforeend", `<div class="unit" id="unit ${GID}"><div class="reply"><div class="info"><span class="status">回复</span></div><div class="selector" id="selector ${GID}"></div></div></div>`);
        let selector = document.getElementById(`selector ${GID}`);
        for (let child of group) {
            ret = child['NextGroupId'];
            selector.insertAdjacentHTML("beforeend", `<div data-unselected class="button" id="button ${child['Id']}">${child[`Message${this.options['LANG']}`]}</div>`);
        }
        this.playState = 2;
        return [ret, group];
    }

    addStory(group) {
        let container = document.getElementById("container");
        container.insertAdjacentHTML("beforeend", `<div class="unit" id="unit ${group[group.length - 1]['FavorScheduleId']}"><div data-right class="box"><div class="story"><div class="info"><span class="stat">羁绊事件</span></div><div class="selector" id="selector ${group[0]['MessageGroupId']}"><div data-story class="button" id="button">前往妃咲的羁绊剧情</div></div></div><div class="suitable-button" id="button ${group[group.length - 1]['Id']}">继续</div></div></div></div>`);
        this.playState = 2;
        return [group[group.length - 1]['NextGroupId'], group];
    }

    cleanup(GID, oBID, nBID, force = false) {
        if (oBID === nBID) return false;
        if (oBID === -1) return true;
        if (force || this.mappings.get(oBID)['NextGroupId'] !== this.mappings.get(nBID)['NextGroupId']) {
            let cur = document.getElementById(`unit ${GID}`);
            while (true) {
                if (cur.nextElementSibling === null) break;
                cur.nextElementSibling.remove();
            }
        }
        return true;
    }
}

export {
    PlotReader
}
