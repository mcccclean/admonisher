
class Input {
    constructor() {
        this.bindings = {};
        this.actions = [];
    }

    bindKey(key, action) {
        this.bindings[key] = action;
    }

    handleKeyPress(key) {
        let action = this.bindings[key];
        if(action) {
            this.actions.push(action);
        }
    }

    popAction() {
        return this.actions.shift();
    }
}