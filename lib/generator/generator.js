import Random from '../random';

export default class Generator {

    constructor(seed) {
        this.rng = new Random(seed);
        this.time = 0;
    }

    step() {
        
    }
     
    update(dt) {
        this.time += dt;
        if(this.time > 0.2) {
            this.step();
            this.time = 0;
        }
    }

    run() {
        while(!this.nextworld) {
            this.step();
        }
        return this.nextworld;
    }

    createWorld() {
        return null;
    }

    draw(ctx) {
        
    }

}
