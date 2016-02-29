
import Component from './component';
import MSG from '../messages';
import World from '../world';
import CavesGenerator from '../generator/caves';

class LevelExit extends Component {

    constructor(options) {
        super(options);
        this.params = options;
    }

    [MSG.interact_obj](data) {
        // TODO: proper generator pass-through
        this.entity.world.nextworld = (new CavesGenerator()).run();
    }
}

Component.register('levelexit', LevelExit);
