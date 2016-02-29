
import Tile from '../tile';

class Wall extends Tile {
    bake(map, x, y) {
        let l = Math.floor(Math.random() * 20) + 20;
        this.color = `rgb(${l+30}, ${l}, ${l})`;
        this.walkable = false;
    }
}

Tile.register('wall', Wall);
