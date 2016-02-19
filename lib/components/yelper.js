
import Component from './component';
import MSG from '../messages';

let names = ['ab', 'bib', 'cob', 'deb', 'erb', 'fub',
    'gib', 'hob', 'ird', 'jeb'];

class Yelper extends Component {
    constructor(options) {
        super(options);
    }

    attach(e) {
        super.attach(e);
        this.name = names.shift();
        this.sad = false;
    }

    [MSG.interact](data) {
        if(this.sad) {
            this.entity.message(MSG.say, 'boo hoo...');
        } else {
            this.entity.message(MSG.say, 'yip!');
        }
    }
    
    [MSG.crack](data) {
        this.entity.message(MSG.say, 'wwwaaaa!');
        this.sad = true;
    }
}

Component.register('yelper', Yelper);
