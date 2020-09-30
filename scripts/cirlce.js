
class Circle{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.type = "circle";
        this.vertices = [];
        this.pos = new Point(this.x,this.y);
        this.visible = true;
    }

    update = function(playerVisibility){
      // this.visible=(this.checkVisibility(playerVisibility));

        this.draw();
    }

    draw = function(){
        c.beginPath();
        c.globalAlpha = 0.2;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.globalAlpha = 1;
        c.closePath();
    }
}