class Game {

    moveDirections = [
        [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }],
        [{ x: 0, y: -1 }, { x: 0, y: -2 }, { x: 0, y: -3 }],
        [{ x: -1, y: 0 }, { x: -2, y: 0 }, { x: -3, y: 0 }],
        [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }]
    ];

    constructor(player1, player2, grid) {
        this.grid = grid;
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = this.player1;
    }

    showMoves() {
        // update the displayed grid 
        this.grid.displayGrid();

        // remove the clickable class from all table cells
        $("td").removeClass("clickable");

        // get the current players coordinates
        let currentPlayerCoords = this.currentPlayer.getCoordinates();

        // for each of the directions from the current square
        for (let j = 0; j < this.moveDirections.length; j++) {

            // for each of the coordinates in one direction
            tileLoop:
            for (let i = 0; i < this.moveDirections[j].length; i++) {

                // get the new coordinates
                let newX = currentPlayerCoords.x + this.moveDirections[j][i].x;
                let newY = currentPlayerCoords.y + this.moveDirections[j][i].y;

                // if this square is within the acceptable range and not a wall
                if (this.grid.withinRange("height", newY) && this.grid.withinRange("width", newX) && !this.grid.getSquare(newX, newY).isWall()) {

                    // if this square contains a player
                    if (this.grid.getSquare(newX, newY).getPlayer()) {

                        // go to the next direction
                        break tileLoop;
                    }

                    // display a clickable box for the square
                    $("td[data-x='" + newX + "'][data-y='" + newY + "']").addClass("clickable");
                    $("td[data-x='" + newX + "'][data-y='" + newY + "']").attr("data-direction", j);

                    // if the square is out of bounds go to the next direction
                } else {
                    break tileLoop;
                }
            }
        }
    }

    acquireWeapon(oldCoordinates, tileX, tileY, direction) {

        // for all the coordinates in the direction the player moved
        for (let i = 0; i < this.moveDirections[direction].length; i++) {

            // get the new coordinates
            let newX = oldCoordinates.x + this.moveDirections[direction][i].x;
            let newY = oldCoordinates.y + this.moveDirections[direction][i].y;

            // if this square has a weapon
            if (this.grid.getSquare(newX, newY).getWeapon()) {

                // take the weapon out of the square
                let newWeapon = this.grid.getSquare(newX, newY).getWeapon();
                newWeapon.setCoordinates(tileX, tileY);
                this.grid.getSquare(newX, newY).removeWeapon();

                // if the player already has a weapon
                if (this.currentPlayer.getWeapon()) {

                    // swap old weapon for new weapon
                    newWeapon.setCoordinates(tileX, tileY);

                    let oldWeapon = this.currentPlayer.getWeapon();
                    this.grid.getSquare(newX, newY).setWeapon(oldWeapon);

                }

                // set the new weapon of the player
                this.currentPlayer.setWeapon(newWeapon);
            }

            // if this coordinate is equal to the square the user stopped at 
            if (tileX === newX && tileY === newY) {
                // end this method
                break;
            }
        }
    }

    makeMove(tileX, tileY, direction) {

        // get the old coordinates of the player
        let currentPlayerCoords = this.currentPlayer.getCoordinates();

        // remove them from the old square
        this.grid.getSquare(currentPlayerCoords.x, currentPlayerCoords.y).removePlayer();

        // get the weapons if any
        this.acquireWeapon(currentPlayerCoords, tileX, tileY, direction);

        // set the new location of the player
        this.currentPlayer.setCoordinates(tileX, tileY);

        // update the square with the player
        this.grid.getSquare(tileX, tileY).setPlayer(this.currentPlayer);

        // switch between the players
        this.switchPlayers()

        // show all possible moves
        this.showMoves();

    }

    switchPlayers() {
        // let currentPlayerName = this.currentPlayer.getName();

        this.currentPlayer = this.currentPlayer.getName() === this.player1.getName() ? this.player2 : this.player1;

        // let nextPlayerName = this.currentPlayer.getName();

        $("#player1Turn, #player2Turn").toggleClass("d-none");

    }

}

// create a new game
let gridGame = new Game(player1, player2, gameGrid);

gridGame.showMoves();