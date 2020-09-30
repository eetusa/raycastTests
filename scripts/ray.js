class Ray{
    constructor(point, angle){
        this.x = point.x;
        this.y = point.y;
        this.dir = new Vector(0,0,angle);
        this.type = "ray";
        this.angle = angle;
    }

    setAngle(angle){
        this.dir = new Vector(0,0,angle);
        this.angle = angle;
    }

    lookAt(x, y){
        this.dir.x = x - this.x;
        this.dir.y = y - this.y;
        this.dir = this.dir.normalize();
        this.angle = atan(this.dir.y/this.dir.x);
     }

     draw = function(){
        
        c.strokeStyle ="rgb(200,100,50)";
        c.beginPath();
        c.moveTo(this.x,this.y);
        c.lineTo(this.x+500*this.dir.x, this.y+500*this.dir.y);
        c.stroke();
        c.closePath();
        
    }

     cast = function(other, ray){
        if (other instanceof Boundary){
            let x1 = other.vertices[0].x;
            let y1 = other.vertices[0].y;
            let x2 = other.vertices[1].x;
            let y2 = other.vertices[1].y;

            let x3 = this.x;
            let y3 = this.y;
            let x4 = this.x + this.dir.x;
            let y4 = this.y + this.dir.y;


            let div = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
            
            if (div == 0){
                return;
            }

            let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / div;
            let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / div;
            

            if (0 <= t && 1 >= t && u>=0){
                let P = new Point(x1 + t * (x2 - x1), y1 + t * (y2-y1));
                return P;
            } else{
                return;
        }
    } else if (other instanceof Circle){
       
        const A = {
            x: this.x,
            y: this.y
        }

        const B = {
            x: this.x + this.dir.x,
            y: this.y + this.dir.y
        }

        const center = {
            x: other.x,
            y: other.y,
        }

        const radius = other.radius;

        const LAB = Math.sqrt( (B.x-A.x)**2 + (B.y-A.y)**2);
        const Dx = (B.x-A.x)/LAB;
        const Dy = (B.y-A.y)/LAB;
        

        const t = Dx * (center.x-A.x) + Dy * (center.y-A.y);
        if (t<0) return;
        
        const Ex = t*Dx+A.x;
        const Ey = t*Dy+A.y;

        const LEC = Math.sqrt ( (Ex - center.x)**2 + (Ey - center.y)**2);
      
        if ( LEC < radius){
            
            const dt = Math.sqrt(radius**2 - LEC**2);
            const Fx = (t-dt)*Dx + A.x; // first intersection point
            const Fy = (t-dt)*Dy + A.y;
            const Gx = (t+dt)*Dx + A.x; // second intersection
            const Gy = (t+dt)*Dx + A.y;

            const FDist = (Fx-A.x)**2+(Fy-A.y)**2;
            const GDist = (Gx-A.x)**2+(Fy-A.y)**2;
         

            return new Point(Fx,Fy);

        } else if (LEC == radius){
            return new Point(Ex,Ey);
        } else{return};
        
    }

}


}