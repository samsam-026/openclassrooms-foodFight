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
    new Weapon("Mousse", 15, "images/mousse.png"),
    new Weapon("Popsicle", 10, "images/popsicle.png")
]