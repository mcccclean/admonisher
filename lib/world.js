
import Tile from './tiles/index';

const TILE_SIZE = 32;

export default class World {
    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.tiles = new Array(w*h);
        this.tiles.fill(0);
        this.entities = [];

        for(let y = 0; y < this.height; ++y) {
            for(let x = 0; x < this.width; ++x) {
                let t;
                if(Math.random() < 0.8) {
                    t = new Tile.CONCRETE;
                } else {
                    t = new Tile.WALL;
                }
                this.setTile(x, y, t);
            }
        }
        for(let y = 0; y < this.height; ++y) {
            for(let x = 0; x < this.width; ++x) {
                this.getTile(x, y).bake(this, x, y);
            }
        }

    }

    turn() {
        this.entities = this.entities.filter((e) => {
            e.turn();
            return !e.destroy;
        });
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
        let ts = TILE_SIZE;
        for(let y = 0; y < this.height; ++y) {
            for(let x = 0; x < this.width; ++x) {
                let t = this.getTile(x, y);
                ctx.fillStyle = t.color;
                ctx.fillRect(x * ts, y * ts, ts, ts);
            }
        }

        ctx.font = '24px Futura';
        let oy = 6;
        let margin = 4;
        for(let e of this.entities) {
            ctx.fillStyle = '#bbb';
            ctx.fillRect(e.pos.x * ts + margin, e.pos.y * ts + margin, 
                    ts - 2*margin, ts - 2*margin);
            ctx.fillStyle = '#fff';
            ctx.fillRect(e.pos.x * ts + margin, e.pos.y * ts + margin - 2, 
                    ts - 2*margin, ts - 2*margin);
            ctx.fillStyle = e.color;
            let ox = ctx.measureText(e.symbol).width / 2;
            ctx.fillText(e.symbol, (e.pos.x+0.5) * ts - ox, (e.pos.y + 0.5) * ts + oy);
        }
    }
}

World.TILE_SIZE = TILE_SIZE;
