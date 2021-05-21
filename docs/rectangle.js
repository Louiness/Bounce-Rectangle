import {
    Box
} from './box.js'

export class Rectangle {
    constructor(length, speed, numberOfBoxes) {
        this.length = length;
        this.boxes = [];

        this.crearteOffset();

        // box speed
        const speedX = speed * createDirection();
        const speedY = speed * createDirection();

        for(let i = 0; i < numberOfBoxes; i++) {
            this.boxes.push(new Box(this.offset.x, this.offset.y, speedX, speedY, length, (1 / (numberOfBoxes + 1))));
        }
    }

    crearteOffset() {
        // Define a spawn point so that the box is not spawned outside the canvas area
        this.offset = {
            // minimum-point < box-point < maximum-point
            x: extractValue(pageWidth, this.length + 50, this.length + 50),
            y: extractValue(pageHeight, this.length + 50, this.length + 50)
        };
    }

    move() {
        for(let i = 0; i < (this.boxes.length - 1); i++) {
            if(Math.abs(this.boxes[i].x - this.boxes[i + 1].x) > 30 ||
            Math.abs(this.boxes[i].y - this.boxes[i + 1].y) > 30) {
                this.boxes[i + 1].move();
            }
        }
        this.boxes[0].move();
    }

    draw(ctx) {
        for(let i = 0; i < this.boxes.length; i++) {
            this.boxes[i].draw(ctx);
        }
        this.move();
    }
}