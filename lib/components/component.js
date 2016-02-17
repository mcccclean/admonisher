
let REGISTRY = {};

export default class Component {
    constructor(options) {

    }

    attach(e) {
        this.entity = e;
    }

    detach() {
        this.entity.detachComponent(this);
    }

    static register(name, cls) {
        REGISTRY[name] = cls;
    }

    static create(name, options) {
        var cls = REGISTRY[name];
        if(cls) {
            return new cls(options);
        } else {
            console.log("Not found:", name);
            return null;
        }
    }
}
