function round(add) {
    cameraAngleRadians += add;
    drawScene(wgl.gl, wgl.program);
}

function rotateX(add) {
    cameraRotation[0] += add;
    if (cameraRotation[0] > 180) cameraRotation[0] = 180;
    else if (cameraRotation[0] < 90) cameraRotation[0] = 90;
    // console.log("y = ", cameraRotation[0]);
    drawScene(wgl.gl, wgl.program);
}

function rotateY(add) {
    cameraRotation[1] += add;
    if (cameraRotation[1] > 360) cameraRotation[1] = 0;
    else if (cameraRotation[1] < 0) cameraRotation[1] = 360;
    // console.log("y = ", cameraRotation[1]);
    drawScene(wgl.gl, wgl.program);
}

function rotateZ(add) {
    rotZ += add;
    rotation[2] = degToRad(rotZ)
    // console.log("z = ", rotZ);
    drawScene(wgl.gl, wgl.program);
}

function moveX(add) {
    translation[0] += add;
    // console.log("x coord = ", translation[0]);
    drawScene(wgl.gl, wgl.program);
}

function moveY(add) {
    translation[1] += add;
    // console.log("y coord = ", translation[1]);
    drawScene(wgl.gl, wgl.program);
}

function moveZ(add) {
    translation[2] += add;
    // console.log("z coord = ", translation[2]);
    drawScene(wgl.gl, wgl.program);
}

function keyDownHandler(event) {
    // console.log(event.key, event.code);
    // else if (event.key == 'd') moveX(5);
    // else if (event.key == 'a') moveX(-5);
    // else if (event.key == 's') moveY(-5);
    // else if (event.key == 'w') moveY(5);
    // else if (event.key == 'q') moveZ(-5);
    // else if (event.key == 'z') moveZ(5);
    if (event.key == 'ArrowUp') rotateX(3);
    else if (event.key == 'ArrowDown') rotateX(-3);
    else if (event.key == 'ArrowLeft') rotateY(3);
    else if (event.key == 'ArrowRight') rotateY(-3);
    else if (event.key == '9') round(0.1);
    // if (event.code == 'KeyZ' && (event.ctrlKey || event.metaKey)) {
    //   alert('Отменить!')
    // }
  }