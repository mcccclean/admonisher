
import Component from './component';
import MSG from '../messages';
import Coord from '../coord';

class Wander extends Component {

    [MSG.turn](data) {
        var th = Math.PI * 0.5 * Math.floor(Math.random() * 4);
        var x = Math.floor(Math.sin(th) + 0.1);
        var y = Math.floor(Math.cos(th) + 0.1);
        this.entity.message(MSG.move, new Coord(x, y));
    }

}

Component.register('wander', Wander);
