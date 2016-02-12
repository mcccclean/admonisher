
class Game {
    constructor(id) {
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width', 800);
        this.canvas.setAttribute('height', 600);
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.map = new Map(20, 20);
    }

    frame() {
        var g = Math.floor(Math.random() * 255);
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, 800, 600);

        this.map.draw(this.ctx);
    }
}

var game;
function frame() {
    requestAnimationFrame(frame);
    game.frame();
}

function run() {
    game = new Game();
    frame();
}
