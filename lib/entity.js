
class Entity {
    constructor(map, pos, options) {
        this.map = map;
        this.pos = pos.clone();
        this.symbol = options.symbol || '?';
        this.color = options.color || '#000';
        this.components = [];
    }

    turn() {
               
    }
}
