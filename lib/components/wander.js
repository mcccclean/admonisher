
import Component from './component';
import MSG from '../messages';
import Coord from '../coord';

class Wander extends Component {

    constructor() {
        super();
        this.sad = false;
    }

    [MSG.turn_plan](data) {
        if(Math.random() < (this.sad ? 0.2 : 0.5)) {
            let th = Math.PI * 0.5 * Math.floor(Math.random() * 4);
            let x = Math.floor(Math.sin(th) + 0.1);
            let y = Math.floor(Math.cos(th) + 0.1);
            this.entity.message(MSG.move, { target: new Coord(x, y), priority: 0 });
        }
    }

    [MSG.crack]() {
        this.sad = true;
    }

}

Component.register('wander', Wander);
