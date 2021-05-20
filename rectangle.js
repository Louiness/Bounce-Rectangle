export class Rectangle {
    constructor (width, height, speed) {
        // box width
        this.width = width;
        // box height
        this.height = height;
        // box speed
        this.speed = speed;
        // rotate degree
        this.degree = 0;
    }

    resize(pageWidth, pageHeight) {
        this.pageWidth = pageWidth;
        this.pageHeight = pageHeight;

        // Define a spawn point so that the box is not spawned outside the canvas area
        this.point = {
            // minimum-point < box-point < maximum-point
            x: extractValue(this.pageWidth, this.width + 50, this.width + 50),
            y: extractValue(this.pageHeight, this.height + 50, this.height + 50)
        };
    }

    setColor(ctx) {
        // Create as an area as much as the box size
        let gradient = ctx.createLinearGradient(-(this.width / 2), -(this.height / 2), this.width, this.height);
        
        gradient.addColorStop(0, '#ff00e0');
        gradient.addColorStop(0.5, '#ffeb3b');
        gradient.addColorStop(1, '#14ffe9');

        return gradient;
    }

    move(ctx) {
        ctx.filter = 'hue-rotate(' + this.degree + 'deg)';
        ctx.rotate(this.degree * Math.PI / 180);
        // this.direction = Math.floor(Math.random() * 2);

        if(this.degree < 360){
            this.degree += 1;
        } else {
            this.degree = 0;
        }

        // if(this.direction === 1){

        // }
    }

    draw (ctx) {
        // ctx.strokeStyle = this.setColor(ctx);
        ctx.strokeStyle = this.setColor(ctx);
        ctx.beginPath();
        ctx.save();
        ctx.translate(this.point.x, this.point.y);
        this.move(ctx);

        ctx.strokeRect(-(this.width / 2), -(this.height / 2), this.width, this.height);
        ctx.restore();
    }
}