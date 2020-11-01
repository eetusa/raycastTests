class LightMask{
    constructor(x,y,startradius, endradius, color="white", inverse=0){
        this.startradius = startradius;
        this.endradius = endradius;
        this.color = color;
        this.x = x;
        this.y = y;
        this.inverse = inverse;
    }

    update(){
       // this.x = mouse.x;
       // this.y = mouse.y;
        this.draw();
    }
    
    draw(){
        if (!this.inverse){
            
            
          //  c.globalCompositeOperation = "destination-over";
           c.globalCompositeOperation = "source-out";
            const grd = c.createRadialGradient(this.x, this.y, this.startradius, this.x, this.y, this.endradius);
            grd.addColorStop(0, this.color);
            grd.addColorStop(1,"rgba(0,0,0,0)");

            c.fillStyle  = grd;
            
            c.beginPath();
            c.arc(this.x, this.y, this.endradius, 0, 2*Math.PI);
            c.fill();
    
        } else{
            const grd = c.createRadialGradient(this.x, this.y, this.startradius, this.x, this.y, this.endradius);
           
            grd.addColorStop(0,"rgba(0,0,0,0)");
           // grd.addColorStop(0.1, "rgba(0,0,0,0.6)");
            grd.addColorStop(0.2, "rgba(0,0,0,1)");
            

            c.fillStyle  = grd;
            c.beginPath();
            c.arc(this.x, this.y, this.endradius, 0, 2*Math.PI);
            c.fill();
        }
        
    }
}