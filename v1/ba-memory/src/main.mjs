const Player = require('./player.mjs');
const Query = require('./constants.mjs');

const param = new URLSearchParams(window.location.search);
if (param.get('appreciation') === null) {
    const info = document.createElement("footer");
    info.innerHTML = `Powered by <i>BA Memory</i> by <span style="font-family:Logo;font-size: 18px">JustPure<span style="color:#0080C0">H</span><sub style="color:#FF9800">2</sub><span style="color:#0080C0">O</span></span></footer>`;
    document.body.appendChild(info);
}
let src = './assets/Azusa_home/Azusa_home.skel';
let tmp = Query.queryByName(param.get('name'));
if (tmp !== undefined) src = tmp;
const Canvas = new Player.Player(param, src);
Canvas.play().then(() => console.log(`Successfully Loaded: ${src}`));
