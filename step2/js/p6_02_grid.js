class Grid {
    constructor(width, height) {
        this.gridWidth = width;
        this.gridHeight = height;
        this.grid = [];
        this.initializeGrid();
    }

    initializeGrid() {
        for (let x = 0; x < this.gridWidth; x++) {
            this.grid.push([]);
            for (let y = 0; y < this.gridHeight; y++) {
                this.grid[x].push(new GridSquare());
            }
        }
    }

    displayGrid() {
        let gridLocation = document.getElementById("grid");
        for (let y = this.gridHeight - 1; y >= 0; y--) {
            let gridRow = document.createElement("tr");
            gridRow.setAttribute("data-y", y);
            for (let x = 0; x < this.gridWidth; x++) {
                let gridCell = document.createElement("td");
                gridCell.setAttribute("data-x", x);
                gridCell.setAttribute("data-y", y);
                if (this.grid[x][y].isWall()) {
                    gridCell.innerHTML = "<div class='" + this.grid[x][y].getType() + "'></div>";
                } else if (!this.grid[x][y].isEmpty()) {
                    gridCell.innerHTML = "<img src='" + this.grid[x][y].getObject().getImage() + "' class='" + this.grid[x][y].getObject().getClassName() + "'/>";
                }
                gridRow.appendChild(gridCell);
            }
            gridLocation.appendChild(gridRow);
        }
    }

    distributeObject(object) {
        let distributed = false;
        do {
            let randomX = Math.floor(Math.random() * 10);
            let randomY = Math.floor(Math.random() * 10);
            let validPosition = false;

            if ((object.getClassName() === "weapon" && this.grid[randomX][randomY].isEmpty()) || (object.getClassName() === "player" && this.grid[randomX][randomY].isEmpty() && this.checkNeighbours(randomX, randomY))) {
                validPosition = true;
            }

            if (validPosition) {
                this.grid[randomX][randomY].setObject(object);
                object.setCoordinates(randomX, randomY);
                distributed = true;
            }

        } while (!distributed);
    }

    checkNeighbours(x, y) {
        let xDirections = [1, 0, 0, -1];
        let yDirections = [0, 1, -1, 0];
        for (let i = 0; i < xDirections.length; i++) {
            let newX = x + xDirections[i];
            let newY = y + yDirections[i];

            if (this.withinRange("height", newY) && this.withinRange("width", newX) && !this.grid[newX][newY].isEmpty()) {
                return false;
            }

        }
        return true;
    }

    withinRange(type, value) {
        let isWithinRange = false;
        if (type === "height") {
            isWithinRange = 0 <= value && value < this.gridHeight;
        } else if ("width") {
            isWithinRange = 0 <= value && value < this.gridWidth;
        }
        return isWithinRange;
    }

    getSquare(x, y) {
        return this.grid[x][y];
    }

}

let gameGrid = new Grid(10, 10);

weaponList.forEach(weapon => {
    gameGrid.distributeObject(weapon);
});

gameGrid.distributeObject(player1);
gameGrid.distributeObject(player2);

gameGrid.displayGrid();