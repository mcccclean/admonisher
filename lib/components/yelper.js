
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
    }

    [MSG.interact](data) {
        console.log(this.name, ': yip!');
    }
    
    [MSG.crack](data) {
        console.log(this.name, ' starts crying');
    }
}

Component.register('yelper', Yelper);
