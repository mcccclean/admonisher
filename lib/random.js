
import MersenneTwister from 'mersenne-twister';

export default class Random {
    constructor(initseed) {
        this.generator = new MersenneTwister(initseed);
    }

    seed(s) {
        this.generator.init_seed(s);
    }

    getInt(max) {
        return Math.floor(this.generator.random() * max);
    }

    getUniform() {
        return this.generator.random();
    }

    getNormal() {
        let x, y, s;
        do {
            x = this.generator.random() * 2 - 1;
            y = this.generator.random() * 2 - 1;
            s = x*x + y*y;
        } while(s >= 1.0)
        return x * Math.sqrt(-2.0 * Math.log(s)/s);
    }

    choose(array) {
        
    }

    chooseWeighted(dict) {
        
    }
        
    shuffle(array) {
        
    }
}
