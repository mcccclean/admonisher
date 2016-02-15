
let REGISTRY = {};

export default class Component {
    constructor(options) {

    }

    attach(e) {
        this.entity = e;
    }

    detach() {
        this.entity.detach(this);
    }

    static register(name, cls) {
        REGISTRY[name] = cls;
    }

    static create(name, options) {
        var cls = REGISTRY[name];
        return new cls(options);
    }
}
