class Polygon{
    constructor(vertices, fillColor = "yellow", opacity = 1, draws = 1, createBoundaries = 1, outlineColor = "black", drawFill = 1, drawOutlines = 1){
        this.sides = [];
        this.vertices = vertices;
        this.outlineColor = outlineColor;
        this.drawFill = drawFill;
        this.fillColor = fillColor;
        this.type = "polygon";
        this.draws = draws;
        this.drawOutlines = drawOutlines;
        this.opacity = opacity;
        this.moved = 1;
        this.bounding = {};
        this.followMouse = 0;


        // create side boundaries & bounding box;
        if (createBoundaries == 1){
            let minX = Infinity;
            let maxX = -Infinity;
            let minY = Infinity;
            let maxY = -Infinity;

            this.sides = [];
            if (vertices.length > 2){
            for (let i = 0; i < this.vertices.length; i++){
                maxX = Math.max(maxX, this.vertices[i].x);
                maxY = Math.max(maxY, this.vertices[i].y);
                minX = Math.min(minX, this.vertices[i].x);
                minY = Math.min(minY, this.vertices[i].y);

                try{
                    if (i < this.vertices.length-1){
                        this.sides.push(new Boundary(this.vertices[i].x, this.vertices[i].y, this.vertices[i+1].x, this.vertices[i+1].y));
                    } else{
                        this.sides.push(new Boundary(this.vertices[this.vertices.length-1].x,this.vertices[this.vertices.length-1].y,this.vertices[0].x,this.vertices[0].y));
                    }
                }catch (err){
                   // console.log(this.vertices);
                }
            }
            }
            this.bounding.x1 = minX;
            this.bounding.x2 = maxX;
            this.bounding.y1 = minY;
            this.bounding.y2 = maxY;
        }
        
    }

    update(){
        if (this.followMouse){
            const dX = mouse.x-mouse.pastX;
            const dY = mouse.y-mouse.pastY;

            for (let vertex of this.vertices){
                vertex.x += dX;
                vertex.y += dY;
            }
            for (let side of this.sides){
                side.x1 += dX;
                side.y1 += dY;
                side.x2 += dX;
                side.y2 += dY;
                side.a.x = side.x1;
                side.a.y = side.y1;
                side.b.x = side.x2;
                side.b.y = side.y2;
            }
            this.getBounding();
        }
        this.draw();


    }


    draw(){
        c.globalAlpha = this.opacity;
        c.strokeStyle = this.outlineColor;
        c.beginPath();
        c.lineWidth = 2;
        c.moveTo(this.vertices[0].x, this.vertices[0].y);
        for (let i = 1; i < this.sides.length; i++){
            c.lineTo(this.vertices[i].x, this.vertices[i].y);
        } 
        c.closePath();
       // c.stroke();
        if (this.drawFill){
            c.fillStyle = this.fillColor;
            c.fill();
      //  }
        }
        c.globalAlpha = 1;
    }

    getBounding(){
        let minX = this.vertices[0].x;
        let maxX = this.vertices[0].x;
        let minY = this.vertices[0].y;
        let maxY = this.vertices[0].y;

        for (let i = 0; i < this.vertices.length; i++){
            maxX = Math.max(maxX, this.vertices[i].x);
            maxY = Math.max(maxY, this.vertices[i].y);
            minX = Math.min(minX, this.vertices[i].x);
            minY = Math.min(minY, this.vertices[i].y);
        }
        this.bounding.x1 = minX;
        this.bounding.x2 = maxX;
        this.bounding.y1 = minY;
        this.bounding.y2 = maxY;
    }

}

