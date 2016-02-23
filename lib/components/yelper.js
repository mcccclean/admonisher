
import Component from './component';
import MSG from '../messages';

let names = ['ab', 'bib', 'cob', 'deb', 'erb', 'fub',
    'gib', 'hob', 'ird', 'jeb'];

const CRIES = ['waaa', ':(', ":'(", 'abloo', 'waaa'];
const YELPS = ['yip!', 'yow!', 'wah!'];

class Yelper extends Component {
    constructor(options) {
        super(options);
    }

    attach(e) {
        super.attach(e);
        this.name = names.shift();
        this.sad = false;
    }

    [MSG.interact_obj](data) {
        let rng = this.entity.world.rng;
        if(this.sad) {
            this.entity.message(MSG.say, rng.choose(CRIES));
        } else {
            this.entity.message(MSG.say, rng.choose(YELPS));
        }
    }
    
    [MSG.crack](data) {
        this.entity.message(MSG.say, 'wwwaaaa!');
        this.sad = true;
    }
}

Component.register('yelper', Yelper);
