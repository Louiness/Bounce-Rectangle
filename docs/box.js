export class Box {
    constructor (x, y, speedX, speedY, length, alpha) {
        this.x = x;
        this.y = y;
        // box length
        this.length = length;
        this.speedX = speedX;
        this.speedY = speedY;
        // rotate degree
        this.degree = 0;
        this.alpha = alpha;
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
            this.degree += Math.abs(this.speedX);
            return this.degree;
        } else {
            this.degree =  0;
            return this.degree;
        }
    }

    move() {
        const radius = extractRadius((this.length / 2), (this.length / 2));

        this.x += this.speedX;
        this.y += this.speedY;

        const minX = radius;
        const maxX = pageWidth - radius;
        const minY = radius;
        const maxY = pageHeight - radius;

        if (this.x <= minX || this.x >= maxX) {
            this.speedX *= -1;
            this.x += this.speedX;
        } else if (this.y <= minY || this.y >= maxY) {
            this.speedY *= -1;
            this.y += this.speedY;
        }
    }

    draw (ctx) {
        ctx.strokeStyle = this.setColor(ctx);
        ctx.beginPath();
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.translate(this.x, this.y);
        ctx.filter = 'hue-rotate(' + this.degree + 'deg)';
        ctx.rotate(this.rotate() * Math.PI / 180);
        ctx.strokeRect(-(this.length / 2), -(this.length / 2), this.length, this.length);
        ctx.restore();
    }
}
