
import Component from './component';
import MSG from '../messages';

class Walker extends Component {
    constructor(options) {
        super(options);
    }

    attach(e) {
        super.attach(e);
    }

    [MSG.move](data) {
        this.target = data;
    }

    [MSG.turn_move](data) {
        if(this.target) {
            var e = this.entity;
            let newpos = e.pos.add(this.target);
            let t = e.world.tilemap.getTile(newpos.x, newpos.y);
            if(t.walkable) {
                var firstEntity = e.world.forEachEntity(newpos.x, newpos.y);
                if(firstEntity) {
                    e.message(MSG.interact_subj, firstEntity);
                    firstEntity.message(MSG.interact_obj, e);
                } else {
                    e.pos = newpos;
                }
            }
            this.target = null;
        }
    }
}

Component.register('walker', Walker);
