
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
        var e = this.entity;
        let newpos = e.pos.add(data);
        let t = e.world.getTile(newpos.x, newpos.y);
        if(t.walkable) {
            var firstEntity = e.world.forEachEntity(newpos.x, newpos.y);
            if(firstEntity) {
                firstEntity.message(MSG.interact);
                firstEntity.message(MSG.move, data);
            } else {
                e.pos = newpos;
            }
        }
    }
}

Component.register('walker', Walker);
