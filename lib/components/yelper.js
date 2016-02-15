
import Component from './component';
import MSG from '../messages';

class Yelper extends Component {
    constructor(options) {
        super(options);
    }

    attach(e) {
        super.attach(e);
    }

    [MSG.interact](data) {
    }
}

Component.register('yelper', Yelper);
