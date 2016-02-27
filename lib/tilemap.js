
import BaseMap from './basemap';
import Tile from './tiles/index';

export default class TileMap extends BaseMap {
    
    constructor(w, h) {
        super(w, h, Tile.VOID);
    }

    generate() {
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

