
class Game {
    constructor(id) {
        this.canvas = document.createElement('canvas');
        this.canvas.setAttribute('width', 800);
        this.canvas.setAttribute('height', 600);
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
    }

    frame() {
        var g = Math.floor(Math.random() * 255);
        this.ctx.fillStyle = 'rgb(0, ' + g + ' 0)';
        this.ctx.fillRect(0, 0, 800, 600);
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
