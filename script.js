"use strict;"

function drawScene(gl, program) {
    wgl.resize();
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    
    // set projection
    let aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    let zNear = 1;
    let zFar = 3000;
    let fieldOfViewRadians = degToRad(60);
    let projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, zNear, zFar);
    
    // set camera
    let radius = 900;
    // let cameraRotation = [degToRad(140), degToRad(0), degToRad(0)];
    let cameraMatrix = m4.yRotation(degToRad(cameraRotation[1]));
    cameraMatrix = m4.xRotate(cameraMatrix, degToRad(cameraRotation[0]));
    cameraMatrix = m4.translate(cameraMatrix, 0, 0, radius);
    
    // set view projection
    let viewMatrix = m4.inverse(cameraMatrix);
    let viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
    let center = (map.px - map.step) / 2;
    viewProjectionMatrix = m4.translate(viewProjectionMatrix, -center, 0, -center);
    
    var matrix = m4.translate(viewProjectionMatrix, 1, -1, 1);
    // matrix = m4.xRotate(matrix, rotation[0]);
    // matrix = m4.yRotate(matrix, rotation[1]);
    // matrix = m4.zRotate(matrix, rotation[2]);
    // matrix = m4.scale(matrix, scale[0], scale[1], scale[2]);
    
    gl.uniform4fv(colorLocation, color);
    gl.uniform3fv(reverseLightDirectionLocation, m4.normalize(light));
    gl.uniformMatrix4fv(matrixLocation, false, matrix);
    // console.log((map.points.length - 1) * (map.points.length - 1) * 6 * 3);
    
    function drawSurface() {
        wgl.takeBufferData(positionLocation, positionBuffer, 3, gl.FLOAT, false, 0, 0);
        wgl.takeBufferData(normalLocation, normalBuffer, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, 6 * (map.points.length - 1) * (map.points.length - 1));
    }
    
    function drawWater() {
        wgl.takeBufferData(waterPositionLocation, waterPositionBuffer, 3, gl.FLOAT, false, 0, 0);
        wgl.takeBufferData(waterNormalLocation, waterNormalBuffer, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLES, 0, cubeArr.length / 3);
    }
    
    // drawSurface();
    drawWater();
}

let cameraRotation = [140, 0, 0];
var cameraAngleRadians = 0;
// var angleInDegrees = 0;
// var angleInRadians = angleInDegrees * Math.PI / 180;
// var translation = [0, 0, 0];
// var rotX = 0;
// var rotY = 0;
// var rotZ = 0;
// var rotation = [degToRad(rotX), degToRad(rotY), degToRad(rotZ)];
var scale = [1, 1, 1];
var color = [Math.random(), Math.random(), Math.random(), 1];
var waterColor = [15/255, 82/255, 186/255, 0.9];
var light = [0.5, 0.7, 1];
var waterLevel = 3.0;

let map = new Map(400, 300);

wgl = new WGL("c", "2d-vertex-shader", "2d-fragment-shader");

document.addEventListener('keydown', keyDownHandler);

let positionLocation = wgl.getAttrLoc("a_position");
let normalLocation = wgl.getAttrLoc("a_normal");
let colorLocation = wgl.getUniformLoc("u_color");
// let waterColorLocation = wgl.getUniformLoc("u_water_color");
let waterLevelLocation = wgl.getUniformLoc("u_water_level1");
let reverseLightDirectionLocation = wgl.getUniformLoc("u_reverseLightDirection");
let matrixLocation = wgl.getUniformLoc("u_matrix");
let dataArray = map.toArray();
let positionBuffer = wgl.bindBuffer(dataArray);
let dataNormal = map.toNormal(dataArray);
let normalBuffer = wgl.bindBuffer(dataNormal);




let cube = new Cube(100, 0, 0, 0);
console.log(cube.cubeCoords)
let cubeArr = cube.toArray();
let cubeNormal = map.toNormal(dataArray);
console.log(cubeArr);
wgl2 = new WGL("c", "3d-vertex-shader-water", "3d-fragment-shader-water");


let waterPositionLocation = wgl2.getAttrLoc("a_position");
let waterNormalLocation = wgl2.getAttrLoc("a_normal");
let waterColorLocation = wgl2.getUniformLoc("u_color");
let waterReverseLightDirectionLocation = wgl2.getUniformLoc("u_reverseLightDirection");
let waterMatrixLocation = wgl2.getUniformLoc("u_matrix");
// let waterDataArray = cube.toArray();
let waterPositionBuffer = wgl.bindBuffer(cubeArr);
console.log(cubeArr)
// let waterDataNormal = map.toNormal(waterDataArray);
let waterNormalBuffer = wgl.bindBuffer(cubeNormal);



drawScene(wgl.gl, wgl.program);