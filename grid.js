import Cell from "./cell";

class Grid {
  constructor(rows, cols, canvas, ctx) {
    this._ctx = ctx;
    this._canvas = canvas;
    this._closedSet = [];
    this._openSet = [];
    this._path = [];
    this._rows = rows;
    this._cols = cols;
    this._grid = [];
    this._isCornerMode = false;
  }

  init(startingGrid) {}

  reset() {}

  draw() {
    this.resize();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].wall == true) {
          grid[i][j].draw(wallColor);
        } else {
          grid[i][j].draw();
        }
      }
    }

    for (var i = 0; i < closedSet.length; i++) {
      closedSet[i].draw(closedColor);
    }

    for (var i = 0; i < openSet.length; i++) {
      openSet[i].draw(openColor);
    }

    for (var i = 0; i < path.length; i++) {
      path[i].draw(pathColor);
    }
    startNode.draw(startColor);
    endNode.draw(endColor);
  }

  resize() {}
}

module.exports = Grid;
