import Entity from './entity';
import World from './world';
import Coord from './coord';
import InputManager from './input';
import MSG from './messages';
import CavesGenerator from './generator/caves';

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
        this.ctx.width = this.canvas.width;
        this.ctx.height = this.canvas.height;
        this.ctx.ts = 32;
        document.body.appendChild(this.canvas);

        let a = document.createElement('a');
        a.setAttribute('class', 'button');
        a.innerHTML = 'save';
        a.addEventListener('click', () => {
            let savecanvas = document.createElement('canvas');
            savecanvas.setAttribute('width', this.canvas.width);
            savecanvas.setAttribute('height', this.canvas.height);
            savecanvas.setAttribute('class', 'savecanvas');
            let ctx = savecanvas.getContext('2d');
            ctx.drawImage(this.canvas, 0, 0);
            document.body.appendChild(savecanvas);
        });
        document.body.appendChild(a);

        this.time = 0;
    }

    init() {
        this.world = (new CavesGenerator()).run();
    }

    draw() {
        let ctx = this.ctx;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 800, 600);

        this.world.draw(ctx);
    }


    frame() {
        let dt = 1.0/30;
        this.time += dt;

        this.world.update(dt, this.input);
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
