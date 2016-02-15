import Entity from './entity';
import World from './world';
import Coord from './coord';
import InputManager from './input';
import MSG from './messages';

class Game {
    constructor(id) {
        this.input = new InputManager();
        this.input.bindKey(37, 'left');
        this.input.bindKey(38, 'up');
        this.input.bindKey(39, 'right');
        this.input.bindKey(40, 'down');
        this.input.bindKey(27, 'escape');
        this.input.bindKey(32, 'space');
        this.input.register();

        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width', 800);
        this.canvas.setAttribute('height', 600);
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.world = new World(20, 20);
        this.player = this.addEntity(2, 2, { symbol: '@' });
        this.addEntity(3, 3, { symbol: 'g' });
        this.addEntity(4, 3, { symbol: 'G' });
        this.addEntity(3, 4, { symbol: '*' });
    }

    addEntity(x, y, options) {
        var e = new Entity(this.world, new Coord(x, y), options);
        this.world.entities.push(e);
        return e;
    }

    frame() {
        let g = Math.floor(Math.random() * 255);
        this.draw(this.ctx);

        let a;
        while(a = this.input.popAction()) {
            switch(a) {
                case 'left':  this.player.message(MSG.turn, new Coord(-1, 0)); break;
                case 'right': this.player.message(MSG.turn, new Coord(1, 0)); break;
                case 'up':    this.player.message(MSG.turn, new Coord(0, -1)); break;
                case 'down':  this.player.message(MSG.turn, new Coord(0, 1)); break;
            }
        }
    }

    draw(ctx) {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 800, 600);

        this.world.draw(ctx);
    }

    update(dt) {
    }
}

let game;
function frame() {
    requestAnimationFrame(frame);
    game.frame();
}

window.run = () => {
    game = new Game();
    frame();
}
