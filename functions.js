function radToDeg(r) {
    return r * 180 / Math.PI;
  }

function degToRad(d) {
return d * Math.PI / 180;
}

function randColor() {
    return Math.random();
}

class WGL {
    constructor(canvas_id, vertex_id, fragment_id) {
        this.canvas = document.getElementById(canvas_id);
        let gl = this.canvas.getContext("webgl");
        if (!gl) {
            throw new Error("webgl not working");
        }
        else {
            this.gl = gl;
            this.vertexShader = this._createShader(this.gl.VERTEX_SHADER, vertex_id);
            this.fragmentShader = this._createShader(this.gl.FRAGMENT_SHADER, fragment_id);
            this.program = this._createProgram();
        }
        console.log(this.gl, this.vertexShader, this.fragmentShader, this.program)
    }

    _createShader(type, id) {
        let source = document.getElementById(id).text;
        let shader = this.gl.createShader(type);   // создание шейдера
        this.gl.shaderSource(shader, source);      // устанавливаем шейдеру его программный код
        this.gl.compileShader(shader);             // компилируем шейдер
        var success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (success) {                        // если компиляция прошла успешно - возвращаем шейдер
            return shader;
        }
       
        console.log(success, this.gl.getShaderInfoLog(shader));
        this.gl.deleteShader(shader);
    }

    _createProgram() {
        var program = this.gl.createProgram();
        this.gl.attachShader(program, this.vertexShader);
        this.gl.attachShader(program, this.fragmentShader);
        this.gl.linkProgram(program);
        var success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
        if (success) {
            return program;
        }
       
        console.log(this.gl.getProgramInfoLog(program));
        this.gl.deleteProgram(program);
    }

    // bindVertexData() {
    //     this.positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_position");
    //     this.colorAttributeLocation = this.gl.getAttribLocation(this.program, "a_color");
    //     this.resolutionUniformLocation = this.gl.getUniformLocation(this.program, "u_resolution");
    //     this.colorUniformLocation = this.gl.getUniformLocation(this.program, "u_color");
    // }

    getAttrLoc(varName) {
        return this.gl.getAttribLocation(this.program, varName);
    }

    getUniformLoc(varName) {
        return this.gl.getUniformLocation(this.program, varName);
    }

    takeBufferData(to, from, size, type, normalize, stride, offset) {
        this.gl.enableVertexAttribArray(to);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, from);
        // if (type == 'float') type = this.gl.FLOAT;
        // else throw new Error ("unknow type of variables in bufer");
        this.gl.vertexAttribPointer(to, size, type, normalize, stride, offset);
    }

    setUniformVar(location, value) {
        let len = value.length;
        if (len == 2) {
            this.gl.uniform2fv(location, value);
        }
        else if (len == 3) {
            this.gl.uniform3fv(location, value);
        }
        else if (len == 4) {
            this.gl.uniform4fv(location, value);
        }
        else throw new Error("uncnown size of uniform array")
    }
    
    setMatrix(location, matrix) {
        let len = matrix.length;
        if (len == 4) {
            this.gl.uniformMatrix2fv(location, value);
        }
        else if (len == 9) {
            this.gl.uniformMatrix3fv(location, value);
        }
        else if (len == 16) {
            this.gl.uniformMatrix4fv(location, value);
        }
        else throw new Error("uncnown size of matrix");
    }

    bindBuffer(data) {
        var buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array(data),
            this.gl.STATIC_DRAW);
        return buffer;
    }

    resize() {
        let displayWidth  = this.canvas.clientWidth;
        let displayHeight = this.canvas.clientHeight;
       
        if (this.canvas.width != displayWidth ||
                this.canvas.height != displayHeight) {
                this.canvas.width = displayWidth;
                this.canvas.height = displayHeight;
        }
    }
}
