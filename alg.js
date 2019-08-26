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
                    surf[i][j] += point[k][2]/(Math.pow(dis[k], 2))/summ;
				
			}
            surf[i][j] = Math.round(surf[i][j]);
		}
    console.log(surf)
}

//function justwoter(surf, )
const fs = require("fs");

//// асинхронное чтение
//fs.readFile('demo2.mod1', "utf8",
//            function(error,data){
//                console.log("Асинхронное чтение файла");
//                if(error) throw error; // если возникла ошибка
//                console.log(data);  // выводим считанные данные
//});

// синхронное чтение
//console.log("Синхронное чтение файла")
let fileContent = fs.readFileSync('demo2.mod1', "utf8");
let w = 400///это изменять
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
	scall(arr,  w * 2 / 3 / (max - min), w / 6 - min * w * 2 / 3 / (max - min));
//scall(arr,  w / 2 / max)
for (let i = 0; i < w + 1; ++i) {
	arr.push([0, i, 0]);
	arr.push([i, 0, 0]);
	arr.push([w, i, 0]);
	arr.push([i, w, 0]);
	}
//arr.push([0, w, 0]);
let surf = new Array(w + 1);
for (let i = 0; i < w + 1; ++i) {
	surf[i] = new Array(w + 1);
}
dosurface(surf, arr, w + 1);//surf - массив высот
//console.table(surf);
//var dis = new Array(arr.length);
//dist(0, 0, arr, dis);

//console.log(arr, min, max);
//console.log(Math.min.apply(Math,dis));