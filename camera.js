class Projection {
    constructor(options) {
        // if (canvas) {
            this.aspect = options.canvas.clientWidth / options.canvas.clientHeight;
        // }
        // else throw new Error("need canvas to create new Camera")
        this.zNear = options.zNear || 1;
        this.zFar = options.zFar || 3000;
        this.angelView = degToRad(options.angelView) || degToRad(60);
        
        // this.getCamera(aspect, zNear, zFar, radius, angles);
    }
    
    getProectionMatrix() {
        return m4.perspective(this.angelView, this.aspect, this.zNear, this.zFar);
    }
}