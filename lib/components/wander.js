
import Component from './component';
import MSG from '../messages';
import Coord from '../coord';

class Wander extends Component {

    constructor() {
        super();
        this.sad = false;
    }

    [MSG.turn](data) {
        if(!this.sad || Math.random() < 0.2) {
            let th = Math.PI * 0.5 * Math.floor(Math.random() * 4);
            let x = Math.floor(Math.sin(th) + 0.1);
            let y = Math.floor(Math.cos(th) + 0.1);
            this.entity.message(MSG.move, new Coord(x, y));
        }
    }

    [MSG.crack]() {
        this.sad = true;
    }

}

Component.register('wander', Wander);
