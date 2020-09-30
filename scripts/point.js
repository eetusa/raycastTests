class Point {

    constructor(x,y){
        this.x = x;
        this.y = y;
        this.type="point";
    }
	
    
    relative(to){
        return new Vector(to.x - this.x, to.y - this.y);
    }

    distance(to){
        return Math.sqrt(Math.pow(this.x - to.x, 2) + Math.pow(this.y - to.y, 2));
    }

    // angle(other){   
    //     if (other.x<this.x){
    //         return Math.PI+Math.atan( (other.y-this.y) / (other.x - this.x) );
    //     } else{
    //         if (other.y<this.y){
    //             return Math.atan( (this.y-other.y) / (this.x-other.x) );
    //         }
    //         return Math.atan( (other.y-this.y) / (other.x - this.x) );
    //     }
    // }

        angle = function(other){
        if (other.x<this.x){
            return Math.PI+Math.atan( (other.y-this.y) / (other.x - this.x) );
        } else{
            return Math.atan( (other.y-this.y) / (other.x - this.x) );
        }
    }
    
}
