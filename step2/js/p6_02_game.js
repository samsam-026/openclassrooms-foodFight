class Game {

    moveDirections = [
        [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }],
        [{ x: 0, y: -1 }, { x: 0, y: -2 }, { x: 0, y: -3 }],
        [{ x: -1, y: 0 }, { x: -2, y: 0 }, { x: -3, y: 0 }],
        [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }]
    ];

    tempOldWeaponHold = [];

    constructor(player1, player2, grid) {
        this.grid = grid;
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = this.player1;
    }

    showMoves() {
        $("td").removeClass("clickable");
        let currentPlayerCoords = this.currentPlayer.getCoordinates();

        for (let j = 0; j < this.moveDirections.length; j++) {
            tileLoop:
            for (let i = 0; i < this.moveDirections[j].length; i++) {
                let newX = currentPlayerCoords.x + this.moveDirections[j][i].x;
                let newY = currentPlayerCoords.y + this.moveDirections[j][i].y;

                if (this.grid.withinRange("height", newY) && this.grid.withinRange("width", newX) && !this.grid.getSquare(newX, newY).isWall()) {

                    if (this.grid.getSquare(newX, newY).getObject() && this.grid.getSquare(newX, newY).getObject().getClassName() === "player") {
                        break tileLoop;
                    }
                    $("td[data-x='" + newX + "'][data-y='" + newY + "']").addClass("clickable");
                    $("td[data-x='" + newX + "'][data-y='" + newY + "']").attr("data-direction", j);
                } else {
                    break tileLoop;
                }
            }
        }

    }

    acquireWeapon(oldCoordinates, tileX, tileY, direction) {

        // console.log("acquireWeapon", oldCoordinates, tileX, tileY, direction);


        for (let i = 0; i < this.moveDirections[direction].length; i++) {
            let newX = oldCoordinates.x + this.moveDirections[direction][i].x;
            let newY = oldCoordinates.y + this.moveDirections[direction][i].y;
            let oldWeapon;

            // console.log("before if", this.grid.getSquare(newX, newY));
            if (this.grid.getSquare(newX, newY).getObject() && this.grid.getSquare(newX, newY).getObject().getClassName() === "weapon") {
                if (this.currentPlayer.getWeapon()) {
                    // console.log("before switch grid", this.grid.getSquare(newX, newY));
                    // console.log("before switch", this.currentPlayer);

                    // get old weapon to temporary store
                    oldWeapon = { weapon: this.currentPlayer.getWeapon(), player: this.currentPlayer.getName(), position: { x: newX, y: newY } };

                    // console.log("oldWeapon", oldWeapon);

                    // player takes in new weapon
                    this.grid.getSquare(newX, newY).getObject().setCoordinates(tileX, tileY);
                    this.currentPlayer.setWeapon(this.grid.getSquare(newX, newY).getObject());

                    if (tileX === newX && tileY === newY) {
                        this.tempOldWeaponHold.push(oldWeapon);
                        console.log("tempOldWeaponHold pushed", this.tempOldWeaponHold);
                    } else {
                        // old weapon in new weapons place
                        this.grid.getSquare(newX, newY).setObject(oldWeapon.weapon);
                        $("td[data-x='" + newX + "'][data-y='" + newY + "']").html("<img src='" + oldWeapon.weapon.getImage() + "' class='weapon'/>");
                    }



                    // console.log("after switch grid", this.grid.getSquare(newX, newY));
                    // console.log("after switch", this.currentPlayer);

                } else {
                    // console.log("before switch grid no weapon", this.grid.getSquare(newX, newY));
                    // console.log("before switch no weapon", this.currentPlayer);

                    this.currentPlayer.setWeapon(this.grid.getSquare(newX, newY).getObject());
                    this.grid.getSquare(newX, newY).getObject().setCoordinates(tileX, tileY);
                    this.grid.getSquare(newX, newY).removeObject();
                    $("td[data-x='" + newX + "'][data-y='" + newY + "']").html("");
                    // console.log("after switch grid no weapon", this.grid.getSquare(newX, newY));
                    // console.log("after switch no weapon", this.currentPlayer);
                }
            }

            if (tileX === newX && tileY === newY) {
                break;
            }
        }

    }

    clearWeaponHold() {
        if (this.tempOldWeaponHold.length > 0) {
            console.log("tempOldWeaponHold has values");


            let currentPlayerOldWeaponIndex = this.tempOldWeaponHold.findIndex(oldWeapon => oldWeapon.player === this.currentPlayer.getName());

            if (currentPlayerOldWeaponIndex > -1) {
                console.log("current player has values");

                let currentPlayerOldWeapon = this.tempOldWeaponHold[currentPlayerOldWeaponIndex];

                console.log("currentPlayerOldWeapon", currentPlayerOldWeapon.weapon);


                this.grid.getSquare(currentPlayerOldWeapon.position.x, currentPlayerOldWeapon.position.y).setObject(currentPlayerOldWeapon.weapon);
                $("td[data-x='" + currentPlayerOldWeapon.position.x + "'][data-y='" + currentPlayerOldWeapon.position.y + "']").html("<img src='" + currentPlayerOldWeapon.weapon.getImage() + "' class='weapon'/>");

                console.log("this.grid.", this.grid.getSquare(currentPlayerOldWeapon.position.x, currentPlayerOldWeapon.position.y));
                console.log("td", currentPlayerOldWeapon.position.x, currentPlayerOldWeapon.position.y);


                this.tempOldWeaponHold.splice(currentPlayerOldWeaponIndex, 1);
            }

        }
    }

    makeMove(tileX, tileY, direction) {

        let currentPlayerCoords = this.currentPlayer.getCoordinates();
        this.grid.getSquare(currentPlayerCoords.x, currentPlayerCoords.y).removeObject();

        $("td[data-x='" + currentPlayerCoords.x + "'][data-y='" + currentPlayerCoords.y + "']").html("");

        console.log("makeMove currentPosition", currentPlayerCoords.x, currentPlayerCoords.y);

        this.clearWeaponHold();

        this.acquireWeapon(currentPlayerCoords, tileX, tileY, direction);

        if (this.currentPlayer.getWeapon()) {
            this.currentPlayer.getWeapon().setCoordinates(tileX, tileY);
            $("td[data-x='" + tileX + "'][data-y='" + tileY + "']").html("<div class='player-div'><img src='" + this.currentPlayer.getImage() + "' class='player'/><img src='" + this.currentPlayer.getWeapon().getImage() + "' class='player-weapon' /></div>");
        } else {
            $("td[data-x='" + tileX + "'][data-y='" + tileY + "']").html("<img src='" + this.currentPlayer.getImage() + "' class='player'/>");
        }

        console.log("makeMove tiles", tileX, tileY);

        // this.clearWeaponHold();

        this.currentPlayer.setCoordinates(tileX, tileY);
        this.grid.getSquare(tileX, tileY).setObject(this.currentPlayer);

        this.currentPlayer = this.currentPlayer.getName() === this.player1.getName() ? this.player2 : this.player1;

        this.showMoves();

    }

}

let gridGame = new Game(player1, player2, gameGrid);

gridGame.showMoves();