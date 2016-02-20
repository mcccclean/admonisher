
import Tile from './tiles/index';
import TileMap from './tilemap';
import Entity from './entity';
import Coord from './coord';
import Random from './random';
import MSG from './messages';

export default class World {
    constructor(w, h) {
        this.turnNumber = 0;
        this.rng = new Random();
        this.entities = [];
        this.tilemap = new TileMap(w, h);

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

        var mapw = this.tilemap.width;
        var maph = this.tilemap.height;

        // create player
        this.player = this.addEntity(mapw/2, maph/2, mayor);
        this.tilemap.setTile(this.player.pos.x, this.player.pos.y, new Tile.CONCRETE());

        // add some goblins
        for(var i = 0; i < 10; ) {
            var x = this.rng.getInt(mapw);
            var y = this.rng.getInt(maph);
            if(!this.forEachEntity(x, y)) {
                this.addEntity(x, y, goblin);
                this.tilemap.setTile(x, y, new Tile.CONCRETE());
                i++;
            }   
        }

        this.tilemap.bake();
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
        this.tilemap.draw(ctx);

        for(let e of this.entities) {
            e.message(MSG.draw, ctx);
        }
        for(let e of this.entities) {
            e.message(MSG.draw_ui, ctx);
        }
    }
}

