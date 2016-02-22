
import Tile from './tiles/index';
import TileMap from './tilemap';
import Entity from './entity';
import Coord from './coord';
import Random from './random';
import MSG from './messages';
import { _ } from 'lodash';

export default class World {
    constructor(w, h) {
        this.turnNumber = 0;
        this.rng = new Random();
        this.entities = [];
        this.tilemap = new TileMap(w, h);
        this.nextworld = null;

        var mapw = this.tilemap.width;
        var maph = this.tilemap.height;

        // some other definitions
        // TODO: move this to a better place
        var mayor = {
            yeller: {},
            walker: {},
            looker: {},
            tags: { tags: ['human'] },
            speaker: { fg: '#fff', bg: '#300' },
            draw: { symbol: '@', color: '#eee' },
            interactor: {}
        };
        var goblin = { 
            yelper: {},
            wander: {},
            walker: {},
            psyche: {},
            speaker: {},
            tags: { tags: ['goblin'] },
            draw: { symbol: 'g', color: '#2a2' },
        };
        var cave_down = {
            draw: { symbol: '>', color: '#533' },
            levelexit: { width: mapw, height: maph }
        };
        var cave_up = {
            draw: { symbol: '<', color: '#daa' }
        };

        var addrandom = (ent) => { 
            var x = this.rng.getInt(mapw);
            var y = this.rng.getInt(maph);
            if(!this.forEachEntity(x, y)) {
                let e = this.addEntity(x, y, ent);
                this.tilemap.setTile(x, y, new Tile.CONCRETE());
                return e;
            } else {
                return null;
            }
        };

        // create player
        while(!this.player) {
            var stairs = addrandom(cave_up);
            if(stairs) {
                this.player = this.addEntity(stairs.pos.x, stairs.pos.y, mayor);
            }
        }
        while(!addrandom(cave_down)) {}
        // add some goblins
        for(var i = 0; i < 10; ) {
            if(addrandom(goblin)) { ++i; }
        }

        this.tilemap.bake();
        this.turn();
    }

    addEntity(x, y, options) {
        var e = new Entity(this, new Coord(x, y), options);
        this.entities.push(e);
        return e;
    }

    messageAll(message, data) {
        // TODO: read from indexes
        for(let e of this.entities) {
            e.message(message, data);
        }
    }

    turn() {
        if(this.turnNumber > 0) {
            this.messageAll(MSG.turn_move, this.turnNumber);
            this.messageAll(MSG.turn_act, this.turnNumber);
            this.entities = this.entities.filter((e) => {
                e.message(MSG.filter, this.turnNumber);
                return !e.destroy;
            });
        }

        this.messageAll(MSG.turn_percept, this.turnNumber);
        this.messageAll(MSG.turn_plan, this.turnNumber);

        this.turnNumber++;
    }

    // first : everyone plans what they're gonna do next
    //     * percept
    //     * plan
    // then : 
    //     * draw       (diegetic)
    //     * draw_ui    (overlay)
    // finally : everyone moves
    //      * turn_act
    //      * turn_move

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

    getNextWorld() {
        return this.nextworld;
    }
}

