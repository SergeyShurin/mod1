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

    toArray(arrCoords) {
        let arr = [];
        if (!arrCoords) {
            var arrCoords = this.cubeCoords;
        }
        for (let i = 0; i < arrCoords.length; i += 12) {
            arr.push(arrCoords[i]);
            arr.push(arrCoords[i + 1]);
            arr.push(arrCoords[i + 2]);

            arr.push(arrCoords[i + 3]);
            arr.push(arrCoords[i + 4]);
            arr.push(arrCoords[i + 5]);

            arr.push(arrCoords[i + 6]);
            arr.push(arrCoords[i + 7]);
            arr.push(arrCoords[i + 8]);

            arr.push(arrCoords[i + 3 + 3]);
            arr.push(arrCoords[i + 4 + 3]);
            arr.push(arrCoords[i + 5 + 3]);

            arr.push(arrCoords[i + 3]);
            arr.push(arrCoords[i + 1 + 3]);
            arr.push(arrCoords[i + 2 + 3]);

            arr.push(arrCoords[i + 6 + 3]);
            arr.push(arrCoords[i + 7 + 3]);
            arr.push(arrCoords[i + 8 + 3]);
        }
        return arr;
    }
}

class CubeWater {
    constructor(size, array) {
        // if (size > 0) {
        //     this.size = size / 2;
        // }
        // else throw new Error("size of cube must be more than 0");
        // this.x = x;
        // this.y = y;
        // this.z = z;
        // this.color = color || [0.1, 0.9, 0.6, 1];
        let arr = [];
        for (let i = 0; i < array.length; i += 3) {
            let newCube = new Cube(size, array[0], array[1], array[2]);
            let newArr = newCube.cubeCoords;
            arr = arr.concat(newArr);
        }
        this.waterCoords = arr;

        // this._create();
    }
}

