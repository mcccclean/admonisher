
import Component from './component';
import MSG from '../messages';

export default class Walker extends Component {
    constructor(options) {
        super(options);
    }

    attach(e) {
        super.attach(e);
    }

    [MSG.turn](data) {
        let newpos = this.entity.pos.add(data);
        this.entity.pos = newpos;
    }
}