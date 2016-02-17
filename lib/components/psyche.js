
import Component from './component';
import MSG from '../messages';

class Psyche extends Component {

    constructor(options) {
        super(options);
        this.strength = 3;
    }

    [MSG.interact](data) {
        if(this.strength > 0) {
            this.strength -= 1;
            if(this.strength <= 0) {
                this.entity.message(MSG.crack, {});
            }
        }
    }

    [MSG.crack](data) {
        this.entity.color = "#aaf";
        this.detach();
    }
}

Component.register('psyche', Psyche);
