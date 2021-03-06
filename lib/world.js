
import Tile from './tiles/index';
import TileMap from './tilemap';
import LightMap from './lightmap';
import Entity from './entity';
import Coord from './coord';
import Random from './random';
import MSG from './messages';
import Codex from './codex';
import { _ } from 'lodash';

export default class World {
    constructor(w, h) {
        this.turnNumber = 0;
        this.rng = new Random();
        this.entities = [];
        this.tilemap = new TileMap(w, h);
        this.lightmap = new LightMap(w, h);
        this.nextworld = null;
    }

    prepare() {
        this.tilemap.bake();
        this.turn_after();
    }

    populate() {
        var mapw = this.tilemap.width;
        var maph = this.tilemap.height;

        // some other definitions
        // TODO: move this to a better place

        var addrandom = (ent) => { 
            var x = this.rng.getInt(mapw);
            var y = this.rng.getInt(maph);
            if(!this.forEachEntity(x, y)) {
                let e = this.addEntity(x, y, ent);
                this.tilemap.setTile(x, y, Tile.create('concrete'));
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

    }

    addEntity(x, y, options) {
        if(typeof(options) === 'string') {
            let name = options;
            options = Codex[name];
            if(!options) {
                console.log("No codex entry " + name);
                return null;
            }
        }
        if(options) {
            var e = new Entity(this, new Coord(x, y), options);
            this.entities.push(e);
            return e;
        }
    }

    messageAll(message, data) {
        // TODO: read from indexes
        for(let e of this.entities) {
            e.message(message, data);
        }
    }

    processInput(input) {
        let a = input.popAction();
        if(a) {
            let player = this.player;
            if(player) {
                var move = function(dx, dy) {
                    player.message(MSG.move, { target: new Coord(dx, dy), priority: 10 });
                };
                switch(a) {
                    case 'left':  move(-1, 0); break;
                    case 'right': move(1, 0); break;
                    case 'up':    move(0, -1); break;
                    case 'down':  move(0, 1); break;
                }
            }
            return true;
        } else {
            return false;
        }
    }

    update(dt, input) {
        let turn = this.processInput(input);
        if(turn) {
            this.turn();
        }
    }

    turn() {
        let turnobj = { turnNumber: this.turnNumber };

        this.messageAll(MSG.turn_move, turnobj);
        this.messageAll(MSG.turn_act, turnobj);
        this.entities = this.entities.filter((e) => {
            e.message(MSG.filter, turnobj);
            return !e.destroy;
        });

        this.turn_after();
    }

    turn_after() {
        let turnobj = { turnNumber: this.turnNumber };
        this.messageAll(MSG.turn_percept, turnobj);
        this.messageAll(MSG.turn_plan, turnobj);

        // calculate lightmap
        var light = this.lightmap;
        var ppos = this.player.pos;
        var tiles = this.tilemap;
        var godview = false;
        if(godview) {
            light.tiles.fill(1);
            light.explored.fill(1);
        } else {
            light.tiles.fill(0);
            light.circle(ppos.x, ppos.y, 10, function(x, y) {
                tiles.line(ppos.x, ppos.y, x, y, function(t, x, y) {
                    var dist = new Coord(x, y).subtract(ppos).length();
                    var near = 3;
                    var far = 8;
                    var amt = (dist-near) / far;
                    var level = Math.min(1, Math.max(1 - amt, 0));
                    light.setTile(x, y, level);
                    return t.walkable;
                });
            });
        }

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
        ctx.save();
            var w = this.tilemap.width * ctx.ts;
            var h = this.tilemap.height * ctx.ts;
            ctx.translate((ctx.width - w)/2, (ctx.height - h)/2);

            this.tilemap.draw(ctx);

            this.entities.sort(function(a, b) {
                if(a.pos.y == b.pos.y) {
                    return b.id - a.id;
                } else {
                    return a.pos.y - b.pos.y;
                }
            });
            for(let e of this.entities) {
                if(this.lightmap.getTile(e.pos.x, e.pos.y) > 0) {
                    e.message(MSG.draw, ctx);
                }
            }

            // draw lightmap
            this.lightmap.draw(ctx);

            for(let e of this.entities) {
                if(this.lightmap.getTile(e.pos.x, e.pos.y) > 0) {
                    e.message(MSG.draw_ui, ctx);
                }
            }
        ctx.restore();
    }

    getNextWorld() {
        return this.nextworld;
    }
}

