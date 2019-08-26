class Map {
    constructor(size, px) {
        this.points = this._genMap(size);
        this.size = size;
        this.px = px;
        this.step = px / size;
    }

    _genMap(n) {
        // let map = [];
        // for (let i = 0; i < n; i++) {
        //     let arr = [];
        //     for (let j = 0; j < n; j++) {
        //         let val = (Math.random()) * -1 * i; 
        //         arr.push(val);
        //     }
        //     map.push(arr);
        // }
            //let w = 40
        //let speed = w * 4
        function scall(arr, sc, delt)
        {
            for (let i = 0; i < arr.length; ++i) {
                for (let j = 0; j < arr[i].length; ++j) {
                    arr[i][j] *= sc;
                    if (j != 2)
                        arr[i][j] += delt;
                }
            }
        }

        function dist(x, y, point, dis){
            let summ = 0;
            for (let i = 0; i < point.length; ++i)
            {
                dis[i] = Math.sqrt(Math.pow(x - point[i][0], 2) + Math.pow(y - point[i][1], 2));
                summ += 1 / Math.pow(dis[i], 2);
            }
            return summ;
        }
        function dosurface(surf, point, minz)
        {
            var dis = new Array(point.length);
            for (let i = 0; i < surf.length; ++i)
                for (let j = 0; j < surf[i].length; ++j)
                {
                    let summ = dist(i, j, point, dis);
                    if (Math.min.apply(Math,dis) == 0) {
                        surf[i][j] = point[dis.indexOf(0)][2];
                    }
                    else
                    {
                        surf[i][j] = 0;
                        for (let k = 0; k < dis.length; ++k)
                            surf[i][j] += -point[k][2]/(Math.pow(dis[k], 2))/summ;
                        
                    }
                    // surf[i][j] = Math.round(surf[i][j]);
                }
            return surf;
            console.log(surf)
        }

        //function justwoter(surf, )
        // const fs = require("fs");

        //// асинхронное чтение
        //fs.readFile('demo2.mod1', "utf8",
        //            function(error,data){
        //                console.log("Асинхронное чтение файла");
        //                if(error) throw error; // если возникла ошибка
        //                console.log(data);  // выводим считанные данные
        //});

        // синхронное чтение
        //console.log("Синхронное чтение файла")
        // let fileContent = fs.readFileSync('demo2.mod1', "utf8");
        let fileContent = `(10000,10000,6000)
        (15000,10000,100) (15000,15000,4000)`;
        let w = n///это изменять
        let arr = fileContent.match(/\(.*?\)/gi)
        let max = 0;
        let min = -1;
        for (let i = 0; i < arr.length; ++i) {
            arr[i] = arr[i].slice(1, -1).split(",");
            for (let j = 0; j < arr[i].length; ++j) {
                arr[i][j] = parseFloat(arr[i][j]);
                if (max < arr[i][j] && j != 2)
                    max = arr[i][j];
                if ((min > arr[i][j] && j != 2) || min == -1)
                    min = arr[i][j];
            }
        }
        if (max != min)
            scall(arr, w / 3 / (max - min), w / 3 - min * w / 3 / (max - min));
            // scall(arr,  w * 2 / 3 / (max - min), w / 6 - min * w * 2 / 3 / (max - min));
        //scall(arr,  w / 2 / max)
        // for (let i = 0; i < w + 1; ++i) {
        //     arr.push([0, i, 0]);
        //     arr.push([i, 0, 0]);
        //     arr.push([w, i, 0]);
        //     arr.push([i, w, 0]);
        //     }
            // arr.push([0, 0, 0]);
            // arr.push([w, 0, 0]);
            // arr.push([w, w, 0]);
            // arr.push([0, w, 0]);
        //arr.push([0, w, 0]);
        let surf = new Array(w);
        for (let i = 0; i < w; ++i) {
            surf[i] = new Array(w);
        }
        // dosurface(surf, arr, w + 1);//surf - массив высот
        //console.table(surf);
        //var dis = new Array(arr.length);
        //dist(0, 0, arr, dis);

        //console.log(arr, min, max);
        //console.log(Math.min.apply(Math,dis));
        this.map = dosurface(surf, arr, n);
        console.log(this.map);
        return this.map;
    }

    toArray() {
        let ret = [];
        let step = this.step;
        let map = this.points;
        if (map) {
            for (let y = 0; y < this.size - 1; y++) {
                for (let x = 0; x < this.size - 1; x++) {
                    ret.push((x) * step);
                    ret.push(map[y][x] * step);
                    ret.push((y) * step);

                    ret.push((x + 1) * step);
                    ret.push(map[y][x + 1] * step);
                    ret.push((y) * step);
                    
                    ret.push((x + 1) * step);
                    ret.push(map[y + 1][x + 1] * step);
                    ret.push((y + 1) * step);
                    
                    ret.push((x) * step);
                    ret.push(map[y][x] * step);
                    ret.push((y) * step);
                    
                    ret.push((x + 1) * step);
                    ret.push(map[y + 1][x + 1] * step);
                    ret.push((y + 1) * step);
                    
                    ret.push((x) * step);
                    ret.push(map[y + 1][x] * step);
                    ret.push((y + 1) * step);
                }
            }
            // console.log(ret)
            return ret;
        }
        else throw new Error("need initialize map of points");
    }


    toNormal(array) {
        let normal = [];
        for (let i = 0; i < array.length; i = i + 9) { 
            let x1 = array[i];
            let y1 = array[i + 1];
            let z1 = array[i + 2];
            let x2 = array[i + 3];
            let y2 = array[i + 4];
            let z2 = array[i + 5];
            let x3 = array[i + 6];
            let y3 = array[i + 7];
            let z3 = array[i + 8];
            let m10 = x1 - x2;
            let m11 = y1 - y2;
            let m12 = z1 - z2;
            let m20 = x1 - x3;
            let m21 = y1 - y3;
            let m22 = z1 - z3;
            let n = [
                m11 * m22 - m12 * m21,
                m12 * m20 - m10 * m22,
                m20 * m21 - m11 * m20,
            ];
            let sum = Math.abs(n[0]) + Math.abs(n[1]) +  Math.abs(n[2]);
            n[0] /= -sum;
            n[1] /= -sum;
            n[2] /= -sum;
            for (let j = 0; j < 3; j++) {
                normal.push(n[0])
                normal.push(n[1])
                normal.push(n[2])
            }
        }
        return normal;
    }

}