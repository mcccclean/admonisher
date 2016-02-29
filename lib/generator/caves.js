import Generator from './generator';
import World from '../world';

export default class CavesGenerator extends Generator {

    constructor(seed) {
        super(seed);

        this.rooms = [];
        this.halls = [];
        this.roomcount = this.rng.getInt(5) + 5;
    }

    step() {
        
    }

    draw(ctx) {

    }

    createWorld() {
        return new World(24, 18);
    }
}

