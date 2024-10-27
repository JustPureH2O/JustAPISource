import {PlotReader} from './plot-reader.cjs';
import {queryByName} from './query.cjs';

const options = {
    FAST_MODE: true,
    LANG: 'CN',
}

const ARGS = new URLSearchParams(this.search);
let name = 'kisaki';
if (ARGS.get('name') !== null) name = ARGS.get('name');
name = queryByName(name);
const Player = new PlotReader(name, options);
Player.play(0);
