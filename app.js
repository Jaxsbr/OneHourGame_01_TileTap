var Tile = (function () {
    function Tile(value, revealed, x, y, width, height) {
        this.value = value;
        this.revealed = revealed;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Tile.prototype.draw = function (ctx) {
        if (this.revealed) {
            ctx.fillStyle = this.getColor();
            ctx.fillRect(this.x * this.width, this.y * this.height, this.width, this.height);
        }
        else {
            ctx.fillStyle = 'black';
            ctx.fillRect(this.x * this.width, this.y * this.height, this.width, this.height);
            ctx.strokeStyle = '#6495ed';
            ctx.strokeRect(this.x * this.width, this.y * this.height, this.width, this.height);
        }
    };
    Tile.prototype.getColor = function () {
        if (this.value == 0) {
            return 'red';
        }
        if (this.value == 1) {
            return 'yellow';
        }
        if (this.value == 2) {
            return 'green';
        }
        return 'black';
    };
    return Tile;
}());
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var Game = (function () {
    function Game(canvas) {
        this.tileSize = 120;
        this.isMouseDown = false;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }
    Game.prototype.start = function () {
        this.mousePoint = new Point(0, 0);
        this.initGrid();
        this.populateGrid();
        this.loop();
    };
    Game.prototype.toggleMouseDown = function (isMouseDown) {
        if (!isMouseDown) {
            // mouse has gone up
            this.tapped();
        }
        this.isMouseDown = isMouseDown;
    };
    Game.prototype.tapped = function () {
        var x = Math.floor(this.mousePoint.x / this.tileSize);
        var y = Math.floor(this.mousePoint.y / this.tileSize);
        this.grid[y][x].revealed = true;
    };
    Game.prototype.updateMousePosition = function (clientX, clientY) {
        this.mousePoint.x = clientX - this.canvas.offsetLeft;
        this.mousePoint.y = clientY - this.canvas.offsetTop;
    };
    Game.prototype.initGrid = function () {
        this.grid = [];
        for (var row = 0; row < 4; row++) {
            this.grid[row] = [];
            for (var col = 0; col < 4; col++) {
                this.grid[row][col] = new Tile(-1, false, col, row, this.tileSize, this.tileSize);
            }
        }
    };
    Game.prototype.populateGrid = function () {
        this.grid[0][0].value = 0;
        this.grid[0][1].value = 1;
        this.grid[0][2].value = 2;
        this.grid[0][3].value = 0;
        this.grid[1][0].value = 1;
        this.grid[1][1].value = 2;
        this.grid[1][2].value = 0;
        this.grid[1][3].value = 1;
        this.grid[2][0].value = 2;
        this.grid[2][1].value = 0;
        this.grid[2][2].value = 1;
        this.grid[2][3].value = 2;
        this.grid[3][0].value = 0;
        this.grid[3][1].value = 1;
        this.grid[3][2].value = 2;
        this.grid[3][3].value = 0;
    };
    Game.prototype.loop = function () {
        var _this = this;
        this.update();
        this.draw();
        requestAnimationFrame(function () { return _this.loop(); });
    };
    Game.prototype.update = function () {
    };
    Game.prototype.draw = function () {
        for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++) {
                this.grid[row][col].draw(this.ctx);
            }
        }
    };
    return Game;
}());
window.onload = function () {
    var canvas = document.getElementById('myCanvas');
    var game = new Game(canvas);
    game.start();
    window.addEventListener('mousedown', function () { game.toggleMouseDown(true); });
    window.addEventListener('mouseup', function () { game.toggleMouseDown(false); });
    window.addEventListener('mousemove', function (e) { game.updateMousePosition(e.clientX, e.clientY); });
};
//# sourceMappingURL=app.js.map