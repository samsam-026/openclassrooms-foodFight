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
                this.grid[x].push(new GridSquare(x, y));
            }
        }
    }

    displayGrid() {
        let gridLocation = document.getElementById("grid");

        // clear the old grid
        gridLocation.innerHTML = "";

        // for the y axis
        for (let y = this.gridHeight - 1; y >= 0; y--) {

            // create a table row
            let gridRow = document.createElement("tr");
            gridRow.setAttribute("data-y", y);

            // for the x axis
            for (let x = 0; x < this.gridWidth; x++) {

                // get the displayed square and add to the table row
                gridRow.appendChild(this.grid[x][y].displaySquare());
            }

            // add the table row to the table
            gridLocation.appendChild(gridRow);
        }
    }

    distributeObject(object) {
        let distributed = false;
        do {

            // get a random x and y value
            let randomX = Math.floor(Math.random() * 10);
            let randomY = Math.floor(Math.random() * 10);
            let validPosition = false;

            // in the case of a weapon, check if the random grid is empty
            // in the case of a player, check if the random grid is empty and no other game objects are in the horizontal or vertical vicinity
            if ((object.getClassName() === "weapon" && this.grid[randomX][randomY].isEmpty()) || (object.getClassName() === "player" && this.grid[randomX][randomY].isEmpty() && this.checkNeighbours(randomX, randomY))) {
                validPosition = true;
            }

            // if the position is valid
            if (validPosition) {

                // set the game object using the correct method
                if (object.getClassName() === "weapon") {
                    this.grid[randomX][randomY].setWeapon(object);
                } else {
                    this.grid[randomX][randomY].setPlayer(object);
                }
                object.setCoordinates(randomX, randomY);

                // change the tag to true to denote the distribution
                distributed = true;
            }

            // run the above code until the object is distributed
        } while (!distributed);
    }

    checkNeighbours(x, y) {
        let xDirections = [1, 0, 0, -1];
        let yDirections = [0, 1, -1, 0];

        // for each possible direction from the given grid postion
        for (let i = 0; i < xDirections.length; i++) {
            let newX = x + xDirections[i];
            let newY = y + yDirections[i];

            // check if the values are within the accepted range and no game object is in that square
            if (this.withinRange("height", newY) && this.withinRange("width", newX) && !this.grid[newX][newY].isEmpty()) {
                // end the method if the above condition is true
                return false;
            }
        }
        return true;
    }

    // check if the entered value is within range
    withinRange(type, value) {
        let isWithinRange = false;
        if (type === "height") {
            isWithinRange = 0 <= value && value < this.gridHeight;
        } else if ("width") {
            isWithinRange = 0 <= value && value < this.gridWidth;
        }
        return isWithinRange;
    }

    // get the GridSquare object of a particular position on the grid
    getSquare(x, y) {
        return this.grid[x][y];
    }

}