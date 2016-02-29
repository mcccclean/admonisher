
let registry = {};
let VOID;

export default class Tile {
    bake(map, x, y) {
        
    }

    static register(name, obj) {
        registry[name] = obj;
    }

    static create(name) {
        let ctor = registry[name];
        if(ctor) {
            return new registry[name];
        } else {
            console.log('No tile ' + name);
            return VOID;
        }
    }

    static void() {
        return VOID;
    }
}

class Void extends Tile {
    constructor() {
        super();
        this.walkable = false;
    }
}

VOID = new Void();
