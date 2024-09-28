const Player = require('./player.mjs');
const Query = require('./constants.mjs');

const param = new URLSearchParams(window.location.search);
let src = './assets/Azusa_home/Azusa_home.skel';
let tmp = Query.queryByName(param.get('name'));
if (tmp !== undefined) src = tmp;
const Canvas = new Player.Player(param, src);
Canvas.play().then(r => console.log(`Successfully Loaded: ${src}`));
