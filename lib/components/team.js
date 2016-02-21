
import Component from './component';
import MSG from '../messages';

class Team extends Component {
    constructor(options) {
        super(options);
        this.team = options.team;
    }

    attach(e) {
        super.attach(e);
    }
}

Component.register('team', Team);
