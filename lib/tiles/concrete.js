
import Tile from '../tile';

class Concrete extends Tile {
    bake(map, x, y) {
        let l = Math.floor(Math.random() * 80) + 100;
        this.color = `rgb(${l}, ${l}, ${l})`;
    }
}

Tile.CONCRETE = Concrete;
