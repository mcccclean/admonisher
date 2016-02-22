
const messages = [
    // turn phases
    'turn_percept',
    'turn_plan',
    'draw',
    'draw_ui',
    'turn_act',
    'turn_move',
    // planning & internal communication
    'move',
    'moveto',
    'crack',
    'changegraphic',
    'say',
    // interaction
    'interact_obj',
    'interact_subj',
];

var MSG = {};
for(let m of messages) {
    MSG[m] = Symbol(m);
}
MSG = Object.freeze(MSG);

export default MSG;
