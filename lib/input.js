
class InputManager {
    constructor() {
        this.bindings = {};
        this.actions = [];
        this.printUnrecognised = false;
    }

    bindKey(key, action) {
        this.bindings[key] = action;
    }

    handleKeyPress(key) {
        let action = this.bindings[key];
        if(action) {
            this.actions.push(action);
        } else if(this.printUnrecognised) {
            console.log(key);
        }
    }

    popAction() {
        if(this.actions) {
            return this.actions.shift();
        } else {
            return null;
        }
    }
}

let Input = new InputManager();
Input.bindKey(37, 'left');
Input.bindKey(38, 'up');
Input.bindKey(39, 'right');
Input.bindKey(40, 'down');
Input.bindKey(27, 'escape');
Input.bindKey(32, 'space');

document.body.addEventListener('keydown', (e) => {
    Input.handleKeyPress(e.keyCode);
});
