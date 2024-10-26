import * as Query from "./constants.cjs";

const param = new URLSearchParams(window.location.search);

if (param.get('appreciation') === null) {
    const info = document.getElementById("info");
    info.innerHTML = `Powered by <i>BA Memory</i> by <b>JustPure<span style="color:#0080C0">H</span><sub style="color:#FF9800">2</sub><span style="color:#0080C0">O</span></b></footer>`;
}
let src = './assets/Azusa_home/Azusa_home.skel';
let [tmp, V4] = Query.queryByName(param.get('name'));
if (tmp !== undefined) src = tmp;
let Canvas;
if (V4) import("./player.cjs").then(Player => {
    Canvas = new Player.Player(param, src);
    Canvas.play().then(() => console.log(`Successfully Loaded: ${src}`));
});
else import("./player_legacy.cjs").then(PlayerLegacy => {
    Canvas = new PlayerLegacy.PlayerLegacy(param, src);
    Canvas.play().then(() => console.log(`Successfully Loaded: ${src}`));
});
