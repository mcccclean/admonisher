
import Component from './component';
import MSG from '../messages';

class Looker extends Component {

    canSeeGoblin() {
        let me = this.entity;
        let search = {
            e: null,
            seen: false
        };
        let cansee = [];
        let canSeeTile = function(t, x, y) { 
            if(search.e.pos.x == x && search.e.pos.y == y) {
                search.seen = true;
                return false;
            } else if(t.walkable) {
                return true;
            } else {
                return false;
            }
        };
        for(let e of me.world.entities) {
            if(e !== me) {
                search.seen = false;
                search.e = e;
                me.world.tilemap.line(me.pos.x, me.pos.y, e.pos.x, e.pos.y, canSeeTile);
                if(search.seen) {
                    cansee.push({ e: e, pos: e.pos.clone(), me: me.pos.clone() });
                }
            }
        }
        return cansee;
    }
    
    [MSG.turn_percept](data) {
        this.entity.cansee = this.canSeeGoblin();
    }

    [MSG.draw_ui](ctx) {
        let ts = ctx.ts;
        let ptx = this.entity.pos.x;
        let pty = this.entity.pos.y;
        
        let markw = 12;
        var mark = (t, x, y) => {
            ctx.fillStyle = t.walkable ? '#ff0' : '#0ff';
            ctx.fillRect(x*ts + markw, y*ts + markw, ts-2*markw, ts-2*markw);
            return t.walkable;
        };
        if(this.entity.cansee) {
            for(let see of this.entity.cansee) {
                let e = see.e;
                this.entity.world.tilemap.line(ptx, pty, e.pos.x, e.pos.y, mark);

                let ts = ctx.ts;
                var f = function(n) { return n * ts + ts/2; };
                ctx.strokeStyle = "#fff";
                ctx.beginPath();
                ctx.moveTo(f(see.me.x), f(see.me.y));
                ctx.lineTo(f(see.pos.x), f(see.pos.y));
                ctx.stroke();
            }
        }
    }
}

Component.register('looker', Looker);
