class Player extends GameObject {
    constructor(name, image, id) {
        super(name, image, "player");
        this.id = id;
        this.health = 100;
    }

    // clear defence move from player
    resetDefence() {
        this.defend = undefined;
        $("#" + this.id + "DefendText").addClass("d-none");
    }

    getId() {
        return this.id;
    }

    getWeapon() {
        return this.weapon;
    }

    getHealth() {
        return this.health;
    }

    isAttacked(attackValue) {
        // the user is defending themselves
        if (this.defend) {
            // halve the attack value before deduction from health
            this.health -= (attackValue / 2);
            this.resetDefence()
        } else {
            // deduct the entire attack value from health
            this.health -= attackValue;
        }

        // if health is more than 0, update the progress bar
        if (this.health > 0) {
            $("#" + this.id + "Health").html(`<div class="progress-bar bg-${this.health > 60 ? "success" : this.health > 30 ? "warning" : "danger"} progress-bar-striped progress-bar-animated" role="progressbar" style="width: ${this.health}%;" aria-valuenow="${this.health}" aria-valuemin="0" aria-valuemax="100">${this.health}%</div>`);
        }

        // return the value of health
        return this.health;
    }

    // player defends themselves from the next attack
    defendsSelf() {
        this.defend = true;
        $("#" + this.id + "DefendText").removeClass("d-none");
    }

    setWeapon(weapon) {
        this.weapon = weapon;
    }

    setCoordinates(x, y) {
        this.x = x;
        this.y = y;
    }
}