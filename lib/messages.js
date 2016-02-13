
const messages = [
    'turn',
    'attack',
    'moveto'
];

const MSG = {};
for(let m of messages) {
    MSG[m] = Symbol(m);
}
