class GridSquare {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.type = (Math.random() > 0.75) ? "wall" : "empty";
    }

    getType() {
        return this.type;
    }

    getPlayer() {
        return this.player;
    }

    setPlayer(item) {
        this.player = item;
    }

    getWeapon() {
        return this.weapon;
    }

    setWeapon(item) {
        this.weapon = item;
    }

    isEmpty() {
        return this.type !== "wall" && !this.player && !this.weapon;
    }

    isWall() {
        return this.type === "wall";
    }

    removePlayer() {
        this.player = undefined;
    }

    removeWeapon() {
        this.weapon = undefined;
    }

    displaySquare() {
        let displayString = "";

        // create a new grid cell
        let gridCell = document.createElement("td");

        // set the x and y values
        gridCell.setAttribute("data-x", this.x);
        gridCell.setAttribute("data-y", this.y);

        // if its a wall
        if (this.type === "wall") {
            // display a wall div
            displayString = "<div class='wall'></div>";

            // if there is a player in the square
        } else if (this.player) {

            // if that player has a weapon
            if (this.player.getWeapon()) {

                //display a player with a weapon
                displayString = "<div class='player-div'><img src='" + this.player.getImage() + "' class='player'/><img src='" + this.player.getWeapon().getImage() + "' class='player-weapon' /></div>";

                // if not
            } else {
                // display the player only
                displayString = "<img src='" + this.player.getImage() + "' class='player'/>";
            }

            // if there is a weapon
        } else if (this.weapon) {

            //display the weapon
            displayString = "<img src='" + this.weapon.getImage() + "' class='weapon'/>";
        }

        // return the grid cell
        gridCell.innerHTML = displayString;
        return gridCell;
    }

}