
import Tile from './tiles/index';

export default class TileMap {
    
    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.tiles = new Array(w*h);
        this.tiles.fill(0);

        // random floor generation
        for(let y = 0; y < this.height; ++y) {
            for(let x = 0; x < this.width; ++x) {
                let t;
                if(Math.random() < 0.8) {
                    t = new Tile.CONCRETE();
                } else {
                    t = new Tile.WALL();
                }
                this.setTile(x, y, t);
            }
        }
    }

    bake() {
        // bake all tiles
        for(let y = 0; y < this.height; ++y) {
            for(let x = 0; x < this.width; ++x) {
                let t = this.getTile(x, y)
                t.bake(this, x, y);
            }
        }
    }

    getTile(x, y) {
        if(x >= 0 && x < this.width &&
                y >= 0 && y < this.height) {
            return this.tiles[y * this.width + x];
        } else {
            return Tile.VOID_TILE;
        }
    }

    setTile(x, y, val) {
        if(x >= 0 && x < this.width &&
                y >= 0 && y < this.height) {
            this.tiles[y * this.width + x] = val;
        }
    }

    draw(ctx) {
        let ts = ctx.ts;
        for(let y = 0; y < this.height; ++y) {
            for(let x = 0; x < this.width; ++x) {
                let t = this.getTile(x, y);
                ctx.fillStyle = t.color;
                ctx.fillRect(x * ts, y * ts, ts, ts);
            }
        }
    }
}
