
import Component from './component';
import MSG from '../messages';

class Walker extends Component {
    constructor(options) {
        super(options);
    }

    attach(e) {
        super.attach(e);
    }

    [MSG.turn](data) {
        var e = this.entity;
        let newpos = e.pos.add(data);
        let t = e.world.getTile(newpos.x, newpos.y);
        if(t.walkable && !e.world.forEachEntity(newpos.x, newpos.y)) {
            e.pos = newpos;
        }
    }
}

Component.register('walker', Walker);
