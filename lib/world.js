
import Tile from './tiles/index';
import Entity from './entity';
import Coord from './coord';
import Random from './random';
import MSG from './messages';

export default class World {
    constructor(w, h) {
        this.turnNumber = 0;
        this.rng = new Random();
        this.width = w;
        this.height = h;
        this.tiles = new Array(w*h);
        this.tiles.fill(0);
        this.entities = [];

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


        // some other definitions
        // TODO: move this to a better place
        var mayor = {
            draw: { symbol: '@', color: '#eee' },
            yeller: {},
            speaker: { fg: '#fff', bg: '#300' },
            walker: {}
        };
        var goblin = { 
            draw: { symbol: 'g', color: '#2a2' },
            speaker: {},
            yelper: {},
            wander: {},
            walker: {},
            psyche: {}
        };

        // create player
        this.player = this.addEntity(this.width/2, this.height/2, mayor);
        this.setTile(this.player.pos.x, this.player.pos.y, new Tile.CONCRETE());

        // add some goblins
        for(var i = 0; i < 10; ) {
            var x = this.rng.getInt(this.width);
            var y = this.rng.getInt(this.height);
            if(!this.forEachEntity(x, y)) {
                this.addEntity(x, y, goblin);
                this.setTile(x, y, new Tile.CONCRETE());
                i++;
            }   
        }

        // bake all tiles
        for(let y = 0; y < this.height; ++y) {
            for(let x = 0; x < this.width; ++x) {
                let t = this.getTile(x, y)
                t.bake(this, x, y);
            }
        }
    }

    addEntity(x, y, options) {
        var e = new Entity(this, new Coord(x, y), options);
        this.entities.push(e);
        return e;
    }

    turn() {
        this.entities = this.entities.filter((e) => {
            e.message(MSG.turn, this.turnNumber);
            return !e.destroy;
        });
        this.turnNumber++;
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

    forEachEntity(x, y, cb) {
        cb = cb || function() { return true; };
        for(let e of this.entities) {
            if(e.pos.x === x && e.pos.y === y && cb(e)) {
                return e;
            }
        }
        return null;
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

        for(let e of this.entities) {
            e.message(MSG.draw, ctx);
        }
        for(let e of this.entities) {
            e.message(MSG.draw_ui, ctx);
        }
    }
}

