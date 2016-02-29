import Generator from './generator';
import World from '../world';
import Tile from '../tiles/index';

export default class CavesGenerator extends Generator {

    constructor(seed) {
        super(seed);

        this.rooms = [];
        this.halls = [];
        this.unconnected = [];
        this.connected = [];
        this.roomcount = this.rng.getInt(5) + 5;
    }

    ok(a) {
        for(let r of this.rooms) {
            let clear = 
                       a.x > (r.x + r.w)
                    || r.x > (a.x + a.w)
                    || a.y > (r.y + r.h)
                    || r.y > (a.y + a.h);
            if(!clear) {
                return false;
            }
        }
        return true;
    }

    makeRoom() {
        let r;
        let tries = 0;
        let ok = false;
        do {
            r = {
                w: this.rng.getInt(2) + 3,
                h: this.rng.getInt(2) + 3,
                x: this.rng.getInt(24 - 5),
                y: this.rng.getInt(18 - 5),
            }
            tries++;
            ok = this.ok(r);
        } while(tries < 10 && !ok);
        if(ok) {
            this.rooms.push(r);
            this.unconnected.push(r);
        }
    }

    makeHall() {
        let p = this.unconnected.pop();
        if(this.connected.length > 0) {
            let c = this.connected[0];
            let mid = function(a, b) { return Math.floor(a + b/2); };
            this.halls.push({ 
                x0: mid(c.x, c.w),
                y0: mid(c.y, c.h),
                x1: mid(p.x, p.w),
                y1: mid(p.y, p.h)
            });
        }
        this.connected.unshift(p);
    }

    step() {
        if(this.rooms.length < this.roomcount) {
            this.makeRoom();
        } else if(this.unconnected.length > 0) {
            this.makeHall();
        } else {
            this.nextworld = this.createWorld();
        }
    }

    draw(ctx) {
        ctx.fillStyle = "#fff";
        ctx.strokeStyle = "#fff";

        let ts = ctx.ts;
        for(let r of this.rooms) {
            ctx.fillRect(r.x * ts, r.y * ts, r.w * ts, r.h * ts);
        }
        for(let h of this.halls) {
            ctx.beginPath();
            ctx.moveTo(h.x0 * ts, h.y0 * ts);
            ctx.lineTo(h.x1 * ts, h.y1 * ts);
            ctx.stroke();
        }
    }

    createWorld() {
        var w = new World(24, 18);
        var map = w.tilemap;   

        map.fill(function(t, x, y) {
            map.setTile(x, y, Tile.create('wall'));
        });
        
        let setconc = function(t, x, y) {
            map.setTile(x, y, Tile.create('concrete'));
            return true;
        };

        let placers = ['mayor', 'cave_down'];
        for(let i in this.rooms) {
            let r = this.rooms[i];
            map.fillRect(r.x, r.y, r.x + r.w, r.y + r.h, setconc);

            let type = placers[i] || 'goblin';
            let x = Math.floor(r.x + r.w / 2);
            let y = Math.floor(r.y + r.h / 2);
            let ent = w.addEntity(x, y, type);
            if(!w.player) {
                w.player = ent;
                w.addEntity(x, y, 'cave_up');
            }
        }

        for(let h of this.halls) {
            map.line(h.x0, h.y0, h.x0, h.y1, setconc);
            map.line(h.x0, h.y1, h.x1, h.y1, setconc);
        }

        w.prepare();

        return w;
    }
}

