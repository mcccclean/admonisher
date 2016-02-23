
import Component from './component';
import MSG from '../messages';

class Walker extends Component {
    constructor(options) {
        super(options);
        this.path = [];
    }

    attach(e) {
        super.attach(e);
    }

    [MSG.move](data) {
        this.target = data;
    }

    [MSG.turn_plan](data) {
        if(!this.target && this.path) {
            this.target = this.path.shift();
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
            ctx.strokeStyle = "#0ff";
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
            if(t.walkable) {
                var firstEntity = e.world.forEachEntity(newpos.x, newpos.y);
                if(!firstEntity) {
                    e.pos = newpos;
                }
            }
            this.target = null;
        }
    }
}

Component.register('walker', Walker);
