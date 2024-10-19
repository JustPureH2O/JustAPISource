const Reader = require('./plot-reader.mjs');
const Query = require('./query.mjs');

const options = {
    FAST_MODE: false,
    LANG: 'CN',
}

const ARGS = new URLSearchParams(this.search);
let name = 'kisaki';
if (ARGS.get('name') !== null) name = ARGS.get('name');
name = Query.queryByName(name);
const Player = new Reader.PlotReader(name, options);
Player.play(0);
