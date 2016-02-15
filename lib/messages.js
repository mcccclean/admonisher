
const messages = [
    'turn',
    'attack',
    'moveto'
];

var MSG = {};
for(let m of messages) {
    MSG[m] = Symbol(m);
}
MSG = Object.freeze(MSG);

export default MSG;
