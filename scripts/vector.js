class Vector{

    constructor(x,y,angle){
        if (angle){
            this.x = Math.cos(angle);
            this.y = Math.sin(angle);
        } else {
	        this.x = x;
            this.y = y;
        }
    }

    add = function(other){
        return new Vector(this.x + other.x, this.y + other.y);
    }

    scale = function(scalar){
        return new Vector(this.x * scalar, this.y * scalar);
    }

    length = function(){
        return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
    }

    normalize = function(){
        
        return this.scale(1/this.length());
    }

    dot = function(other){
        return (this.x*other.x)+(this.y+other.y);
    }

    fromAngle = function(angle){
        return new Vector(Math.cos(angle),Math.sin(angle));
    }

    project = function(normal){
        let projected = new Vector(0,0);
        let dotProd = this.dot(normal);

        projected.x = dotProd * normal.x;
        projected.y = dotProd * normal.y;

        return projected;
    }

    getSqrLength = function(){
        return this.x*this.x + this.y * this.y;
    }

    setLength = function (len){
        let temp = this.normalize().scale(len);
        this.x = temp.x;
        this.y = temp.y;
    }
    
}