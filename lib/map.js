
var TILE_SIZE = 32;

class Map {
    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.tiles = new Array(w*h);
        this.tiles.fill(0);
        this.entities = [];

        for(var y = 0; y < this.height; ++y) {
            for(var x = 0; x < this.width; ++x) {
                var l = Math.floor(Math.random() * 80) + 100;
                var t = {
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
        for(var y = 0; y < this.height; ++y) {
            for(var x = 0; x < this.width; ++x) {
                var t = this.getTile(x, y);
                ctx.fillStyle = t.color;
                ctx.fillRect(x * TILE_SIZE,
                        y * TILE_SIZE, 
                        TILE_SIZE, TILE_SIZE);
            }
        }
    }
}
