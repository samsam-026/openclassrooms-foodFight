class Weapon extends GameObject {
    constructor(name, points, image) {
        super(name, image, "weapon");
        this.points = points;
    }

    getPoints() {
        return this.points;
    }
}

const weaponList = [
    new Weapon("Creme Caramel", 20, "images/creme-caramel.png"),
    new Weapon("Cupcake", 15, "images/cupcake.png"),
    new Weapon("Mousse", 20, "images/mousse.png"),
    new Weapon("Ice Cream", 15, "images/icecream.png")
]

// create players original weapons.
const player1Weapon = new Weapon("Milkshake", 10, "images/milkshake.png");
const player2Weapon = new Weapon("Milkshake", 10, "images/milkshake.png");