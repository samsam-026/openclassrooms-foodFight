class Player extends GameObject {
    constructor(name, image) {
        super(name, image, "player");
    }

    getWeapon() {
        return this.weapon;
    }

    setWeapon(weapon) {
        this.weapon = weapon;
    }

    setCoordinates(x, y) {
        this.x = x;
        this.y = y;
    }
}

let player1 = new Player("Player1", "images/boy.png");
let player2 = new Player("Player2", "images/girl.png");
