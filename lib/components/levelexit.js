
import Component from './component';
import MSG from '../messages';
import World from '../world';

class LevelExit extends Component {

    constructor(options) {
        super(options);
        this.params = options;
    }

    [MSG.interact_obj](data) {
        // TODO: proper generator pass-through
        this.entity.world.nextworld = new World(this.params.width, this.params.height);
    }
}

Component.register('levelexit', LevelExit);
