
import Component from './component';
import MSG from '../messages';

class Tags extends Component {
    constructor(options) {
        super(options);
        this.tags = options.tags;
    }

    attach(e) {
        super.attach(e);
        for(let t of this.tags) {
            this.entity.tags[t] = true;
        }
        this.detach();
    }
}

Component.register('tags', Tags);
