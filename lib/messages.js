
const messages = [
    'turn',
    'move',
    'moveto',
    'interact',
    'crack',
    'draw',
    'draw_ui',
    'changegraphic',
    'say'
];

var MSG = {};
for(let m of messages) {
    MSG[m] = Symbol(m);
}
MSG = Object.freeze(MSG);

export default MSG;
