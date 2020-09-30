class Boundary{
    constructor(x1, y1, x2, y2){
        this.a = new Point(x1,y1);
        this.b = new Point(x2,y2);
        this.vertices = [this.a, this.b];
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.type = "wall";
        this.visible = 1;
    }

    update(){
        this.draw();
    }
    draw(){
        c.strokeStyle ="white";
        c.beginPath();
        c.moveTo(this.x1,this.y1);
        c.lineTo(this.x2,this.y2);
        c.stroke();
        c.closePath();
    }
}