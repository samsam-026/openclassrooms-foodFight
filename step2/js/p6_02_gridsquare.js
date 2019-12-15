class GridSquare {
    constructor() {
        this.type = (Math.random() > 0.75) ? "wall" : "empty";
    }

    getType() {
        return this.type;
    }

    getObject() {
        return this.object;
    }

    setObject(item) {
        this.object = item;
    }

    isEmpty() {
        return this.type !== "wall" && !this.object;
    }

    isWall() {
        return this.type === "wall";
    }

    removeObject() {
        this.object = undefined;
    }

}