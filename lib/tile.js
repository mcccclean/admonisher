
export default class Tile {
    bake(map, x, y) {
        
    }
}

class Void extends Tile {
    constructor() {
        super();
        this.walkable = false;
    }
}

Tile.VOID_TILE = new Void();
