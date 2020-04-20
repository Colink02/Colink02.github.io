var myGamePiece;
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        startGame();
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    }
}

function updateGameArea() {
    myGamePiece.update();
}

function startGame() {
    myGameArea.start();
    myGamePiece = new component(10, 10, "blue");
}

function component(x, y, color) {
    //this.width = width;
    //this.height = height;
    //this.x = x;
    //this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    //ctx.(this.x, this.y, this.width, this.height);
    ctx.beginPath();
    ctx.arc(100, 75, 50, 0, 2 * Math.PI);
    ctx.stroke();
    this.newPos = function () {
        this.x += this.speed * Math.sin(this.angle);
        this.y -= this.speed * Math.cos(this.angle);
    }
    this.update = function () {
        ctx = myGameArea.context;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, 75, 50, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
    }
}