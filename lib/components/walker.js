
import Component from './component';
import MSG from '../messages';

class Walker extends Component {
    constructor(options) {
        super(options);
        this.priority = -1;
        this.target = null;
    }

    attach(e) {
        super.attach(e);
    }

    [MSG.move](data) {
        if(data.priority > this.priority) {
            this.target = data.target;
            this.priority = data.priority;
        } else {
        }
    }

    [MSG.draw_ui](ctx) {
        return;
        if(this.target) {
            let ts = ctx.ts;
            let ep = this.entity.pos;
            let tp = this.target.add(ep);
            let tsx = tp.x * ts + ts/2;
            let tsy = tp.y * ts + ts/2;
            ctx.strokeStyle = (this.priority > 5) ? "#0ff" : "#ff0";
            ctx.beginPath();
            ctx.moveTo(ep.x * ts + ts/2, ep.y * ts + ts/2);
            ctx.lineTo(tsx, tsy);
            ctx.stroke();
            ctx.strokeRect(tsx-5, tsy-5, 10, 10);
        }
    }

    [MSG.turn_move](data) {
        if(this.target) {
            var e = this.entity;
            let newpos = e.pos.add(this.target);
            let t = e.world.tilemap.getTile(newpos.x, newpos.y);
            if(!t) {
                console.log(newpos, t);
            }
            if(t.walkable) {
                var firstEntity = e.world.forEachEntity(newpos.x, newpos.y);
                if(!firstEntity) {
                    e.pos = newpos;
                }
            }
            this.target = null;
        }
        this.priority = -1;
    }
}

Component.register('walker', Walker);
