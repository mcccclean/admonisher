
import Tile from '../tile';

class Wall extends Tile {
    bake(map, x, y) {
        let l = Math.floor(Math.random() * 20) + 230;
        this.color = `rgb(${l}, ${l}, ${l})`;
        this.walkable = false;
    }
}

Tile.WALL = Wall;
