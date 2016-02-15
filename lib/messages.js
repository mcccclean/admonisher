
const messages = [
    'turn',
    'attack',
    'moveto'
];

var MSG = {};
export default MSG;

for(let m of messages) {
    MSG[m] = Symbol(m);
}
MSG = Object.freeze(MSG);

