class Player extends GameObject {
    constructor(name, image, className) {
        super(name, image, "player");
    }

    getName() {
        return this.name;
    }

    getImage() {
        return this.image;
    }

    setCoordinates(x, y) {
        this.x = x;
        this.y = y;
    }
}

let player1 = new Player("Player1", "images/boy.png");
let player2 = new Player("Player2", "images/girl.png");
