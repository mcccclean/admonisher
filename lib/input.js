
export default class InputManager {
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

    register() {
        document.body.addEventListener('keydown', (e) => {
            this.handleKeyPress(e.keyCode);
        });
    }
}

