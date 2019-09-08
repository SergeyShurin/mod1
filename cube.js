class Cube {
    constructor(size, x, y, z, color) {
        if (size > 0) {
            this.size = size / 2;
        }
        else throw new Error("size of cube must be more than 0");
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = color || [0.1, 0.9, 0.6, 1];
        this._create();
    }

    _create() {
        this.cubeCoords = [
            this.x + this.size, this.y - this.size, this.z + this.size,
            this.x + this.size, this.y - this.size, this.z - this.size,
            this.x + this.size, this.y + this.size, this.z + this.size,
            this.x + this.size, this.y + this.size, this.z - this.size,

            this.x - this.size, this.y + this.size, this.z + this.size,
            this.x - this.size, this.y + this.size, this.z - this.size,
            this.x - this.size, this.y - this.size, this.z + this.size,
            this.x - this.size, this.y - this.size, this.z - this.size,

            this.x - this.size, this.y - this.size, this.z + this.size,
            this.x - this.size, this.y - this.size, this.z - this.size,
            this.x + this.size, this.y - this.size, this.z + this.size,
            this.x + this.size, this.y - this.size, this.z - this.size,

            this.x - this.size, this.y + this.size, this.z + this.size,
            this.x - this.size, this.y + this.size, this.z - this.size,
            this.x + this.size, this.y + this.size, this.z + this.size,
            this.x + this.size, this.y + this.size, this.z - this.size,

            this.x - this.size, this.y + this.size, this.z + this.size,
            this.x - this.size, this.y - this.size, this.z + this.size,
            this.x + this.size, this.y + this.size, this.z + this.size,
            this.x + this.size, this.y - this.size, this.z + this.size,

            this.x + this.size, this.y + this.size, this.z - this.size,
            this.x + this.size, this.y - this.size, this.z - this.size,
            this.x - this.size, this.y + this.size, this.z - this.size,
            this.x - this.size, this.y - this.size, this.z - this.size,
        ]
        return this.cubeCoords;
    }

    toArray() {
        let arr = [];
        for (let i = 0; i < this.cubeCoords.length; i += 12) {
            arr.push(this.cubeCoords[i]);
            arr.push(this.cubeCoords[i + 1]);
            arr.push(this.cubeCoords[i + 2]);

            arr.push(this.cubeCoords[i + 3]);
            arr.push(this.cubeCoords[i + 4]);
            arr.push(this.cubeCoords[i + 5]);

            arr.push(this.cubeCoords[i + 6]);
            arr.push(this.cubeCoords[i + 7]);
            arr.push(this.cubeCoords[i + 8]);

            arr.push(this.cubeCoords[i + 3 + 3]);
            arr.push(this.cubeCoords[i + 4 + 3]);
            arr.push(this.cubeCoords[i + 5 + 3]);

            arr.push(this.cubeCoords[i + 3]);
            arr.push(this.cubeCoords[i + 1 + 3]);
            arr.push(this.cubeCoords[i + 2 + 3]);

            arr.push(this.cubeCoords[i + 6 + 3]);
            arr.push(this.cubeCoords[i + 7 + 3]);
            arr.push(this.cubeCoords[i + 8 + 3]);
        }
        return arr;
    }
}

