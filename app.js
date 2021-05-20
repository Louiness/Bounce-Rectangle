import {
    Rectangle
} from './rectangle.js'

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.rectangle = new Rectangle(100, 100);

        this.resize();

        this.animate();

    }

    resize() {
        this.pageWidth = document.body.clientWidth;
        this.pageHeight = document.body.clientHeight;
        
        this.canvas.width = this.pageWidth * 2;
        this.canvas.height = this.pageHeight * 2;
        this.ctx.scale(2, 2);

        this.rectangle.resize(this.pageWidth, this.pageHeight);
    }

    animate(t) {
        this.ctx.clearRect(0, 0, this.pageWidth, this.pageHeight);

        requestAnimationFrame(this.animate.bind(this));

        this.rectangle.draw(this.ctx);
        
    }
}

window.onload = () => {
    new App();
}