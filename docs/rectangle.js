export class Rectangle {
    constructor (length, speed) {
        // box length
        this.length = length;
        // box speed
        this.speed = speed;
        this.speedX = speed * createDirection();
        this.speedY = speed * createDirection();
        // rotate degree
        this.degree = 0;
    }

    crearteOffset(pageWidth, pageHeight) {
        this.pageWidth = pageWidth;
        this.pageHeight = pageHeight;
        // Define a spawn point so that the box is not spawned outside the canvas area
        this.point = {
            // minimum-point < box-point < maximum-point
            x: extractValue(pageWidth, this.length + 50, this.length + 50),
            y: extractValue(pageHeight, this.length + 50, this.length + 50)
        };
    }

    setColor(ctx) {
        // Create as an area as much as the box size
        let gradient = ctx.createLinearGradient(-(this.length / 2), -(this.length / 2), this.length, this.length);
        
        gradient.addColorStop(0, '#ff00e0');
        gradient.addColorStop(0.5, '#ffeb3b');
        gradient.addColorStop(1, '#14ffe9');

        return gradient;
    }

    rotate() {
        if(this.degree < 360) {
            this.degree += this.speed;
            return this.degree;
        } else {
            this.degree =  0;
            return this.degree;
        }
    }

    move() {
        const radius = extractRadius((this.length / 2), (this.length / 2));

        this.point.x += this.speedX;
        this.point.y += this.speedY;

        const minX = radius;
        const maxX = this.pageWidth - radius;
        const minY = radius;
        const maxY = this.pageHeight - radius;

        if (this.point.x <= minX || this.point.x >= maxX) {
            this.speedX *= -1;
            this.point.x += this.speedX;
        } else if (this.point.y <= minY || this.point.y >= maxY) {
            this.speedY *= -1;
            this.point.y += this.speedY;
        }
    }

    draw (ctx) {
        ctx.strokeStyle = this.setColor(ctx);
        ctx.beginPath();
        ctx.save();
        ctx.translate(this.point.x, this.point.y);
        ctx.filter = 'hue-rotate(' + this.degree + 'deg)';
        ctx.rotate(this.rotate() * Math.PI / 180);
        this.move(ctx);
        ctx.strokeRect(-(this.length / 2), -(this.length / 2), this.length, this.length);
        ctx.restore();
    }
}
