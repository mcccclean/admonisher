
let REGISTRY = {};

export default class Component {
    constructor(options) {

    }

    attach(e) {
        this.entity = e;
    }

    static register(name, cls) {
        console.log(cls);
        REGISTRY[name] = cls;
    }

    static create(name, options) {
        var cls = REGISTRY[name];
        console.log(cls);
        return new cls(options);
    }
}
