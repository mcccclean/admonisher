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
        this.ctx.ts = 32;
        document.body.appendChild(this.canvas);

        this.time = 0;
    }

    init() {
        this.world = new World(24, 18);
        this.player = this.world.player;
    }

    draw() {
        let ctx = this.ctx;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 800, 600);

        ctx.save();
            var w = this.world.tilemap.width * ctx.ts;
            var h = this.world.tilemap.height * ctx.ts;
            ctx.translate((this.canvas.width - w)/2, (this.canvas.height - h)/2);
            this.world.draw(ctx);
        ctx.restore();
    }

    processInput() {
        let a = this.input.popAction();
        let player = this.world.player;
        if(a) {
            var move = function(dx, dy) {
                player.message(MSG.move, { target: new Coord(dx, dy), priority: 10 });
            };
            switch(a) {
                case 'left':  move(-1, 0); break;
                case 'right': move(1, 0); break;
                case 'up':    move(0, -1); break;
                case 'down':  move(0, 1); break;
            }
            return true;
        } else {
            return false;
        }
    }

    frame() {
        let dt = 1.0/30;
        this.time += dt;

        let turn = this.processInput();
        if(turn) {
            this.world.turn();
        }
        if(this.world.nextworld) {
            this.world = this.world.nextworld;
        }
        this.draw();
    }
}

let game;

export function getTime() {
    return game.time;
}

function frame() {
    requestAnimationFrame(frame);
    game.frame();
}

window.run = () => {
    game = new Game();
    game.init();
    frame();
}
