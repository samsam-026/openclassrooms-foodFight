class GameObject {
    constructor(name, image, className) {
        this.name = name;
        this.image = image;
        this.className = className;
    }

    getName() {
        return this.name;
    }

    getImage() {
        return this.image;
    }

    getClassName() {
        return this.className;
    }

    setCoordinates(x, y) {
        this.x = x;
        this.y = y;
    }
}