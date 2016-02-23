
import Component from './component';
import MSG from '../messages';

class Interactor extends Component {
    constructor(options) {
        super(options);
        this.path = [];
    }

    attach(e) {
        super.attach(e);
    }

    [MSG.move](data) {
        let newpos = this.entity.pos.add(data.target);
        this.target = this.entity.world.forEachEntity(newpos.x, newpos.y);
    }

    [MSG.draw_ui](ctx) {
        if(this.target) {
            let ts = ctx.ts;
            let ep = this.entity.pos;
            let tp = this.target.add(ep);
            let tsx = tp.x * ts + ts/2;
            let tsy = tp.y * ts + ts/2;
            ctx.strokeStyle = "#f00";
            ctx.beginPath();
            ctx.moveTo(ep.x * ts + ts/2, ep.y * ts + ts/2);
            ctx.lineTo(tsx, tsy);
            ctx.stroke();
            ctx.strokeRect(tsx-5, tsy-5, 10, 10);
        }
    }

    [MSG.turn_act](data) {
        if(this.target) {
            this.entity.message(MSG.interact_subj, this.target);
            this.target.message(MSG.interact_obj, this.entity);
            this.target = null;
        }
    }
}

Component.register('interactor', Interactor);
