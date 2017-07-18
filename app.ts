class Tile {
    value: number;
    revealed: boolean;
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(value: number, revealed: boolean, x: number, y: number, width: number, height: number) {
        this.value = value;
        this.revealed = revealed;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.revealed) {
            ctx.fillStyle = this.getColor();
            ctx.fillRect(this.x * this.width, this.y * this.height, this.width, this.height);
        }
        else {
            ctx.fillStyle = 'black';
            ctx.fillRect(this.x * this.width, this.y * this.height, this.width, this.height);

            ctx.strokeStyle = '#6495ed';            
            ctx.strokeRect(this.x * this.width, this.y * this.height, this.width, this.height)
        }
    }

    getColor() {
        if (this.value == 0) { return 'red'; }
        if (this.value == 1) { return 'yellow'; }
        if (this.value == 2) { return 'green'; }
        return 'black';
    }
}

class Point {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

class Game {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    grid: Tile[][];
    maxTiles: number[];
    tiles: number[];
    tileSize: number = 120;
    isMouseDown: boolean = false;
    mousePoint: Point;    

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
    }

    start() {
        this.mousePoint = new Point(0, 0);
        this.initGrid();
        this.populateGrid();
        this.loop();
    }    

    toggleMouseDown(isMouseDown: boolean) {
        if (!isMouseDown) {
            // mouse has gone up
            this.tapped();
        }

        this.isMouseDown = isMouseDown;
    }

    tapped() {
        var x = Math.floor(this.mousePoint.x / this.tileSize);
        var y = Math.floor(this.mousePoint.y / this.tileSize);

        this.grid[y][x].revealed = true;
    }

    updateMousePosition(clientX: number, clientY: number) {
        this.mousePoint.x = clientX - this.canvas.offsetLeft;
        this.mousePoint.y = clientY - this.canvas.offsetTop;
    }

    initGrid() {
        this.grid = [];

        for (var row = 0; row < 4; row++) {
            this.grid[row] = [];

            for (var col = 0; col < 4; col++) {
                this.grid[row][col] = new Tile(-1, false, col, row, this.tileSize, this.tileSize);
            }
        }

    }

    populateGrid() {
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
    }

    loop() {        
        this.update();
        this.draw();

        requestAnimationFrame(() => this.loop());
    }

    update() {

    }

    draw() {
        for (var row = 0; row < 4; row++) {
            for (var col = 0; col < 4; col++) {                
                this.grid[row][col].draw(this.ctx);
            }
        }
    }

}

window.onload = () => {
    var canvas = document.getElementById('myCanvas');
    var game = new Game(canvas as HTMLCanvasElement);
    game.start();

    window.addEventListener('mousedown', function() { game.toggleMouseDown(true); } );
    window.addEventListener('mouseup', function () { game.toggleMouseDown(false); });
    window.addEventListener('mousemove', function (e) { game.updateMousePosition(e.clientX, e.clientY); });
};
