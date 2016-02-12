
let TILE_SIZE = 32;

class Map {
    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.tiles = new Array(w*h);
        this.tiles.fill(0);
        this.entities = [];

        for(let y = 0; y < this.height; ++y) {
            for(let x = 0; x < this.width; ++x) {
                let l = Math.floor(Math.random() * 80) + 100;
                let t = {
                    color: `rgb(${l}, ${l}, ${l})`
                };
                this.setTile(x, y, t);
            }
        }
    }

    turn() {
        this.entities = this.entities.filter((e) => {
            e.turn();
            return e.destroy;
        });
    }

    getTile(x, y) {
        if(x >= 0 && x < this.width &&
                y >= 0 && y < this.height) {
            return this.tiles[y * this.width + x];
        } else {
            return null;
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

        for(let e of this.entities) {
            ctx.fillStyle = e.color;
            ctx.fillRect(e.x * ts, e.y * ts, ts, ts);
        }
    }
}
