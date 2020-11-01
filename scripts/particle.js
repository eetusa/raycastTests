class Particle{
    constructor(x,y, lightmask, darkmask, stct){
        this.pos = new Point(x,y);
        this.x = x;
        this.y = y;     
        this.lightmask = lightmask;
        this.darkmask = darkmask;   
        this.stct = stct;
        if (lightmask){
            this.light = new LightMask(this.x, this.y, 30, 400, "rgba(255,255,255,0.9)");
        }
        if (darkmask){
            this.dark = new LightMask(this.x,this.y, 30, 1000, "black",1);
        }
    }

    update(){
        printDisplay(this.stct);
        if (this.stct == 0){
           
            this.pos.x = mouse.x;
            this.pos.y = mouse.y;
            this.x = this.pos.x;
            this.y = this.pos.y;

        }

        
    }

    drawMasks(){
        if (this.darkmask==1){
            this.dark.update();
            this.dark.x = this.x;
            this.dark.y = this.y;
        }
        if (this.lightmask==1){
            this.light.update();
            this.light.x = this.x;
            this.light.y = this.y;
        }
       

    }

    look(other, type = 0, elementsArrays = 1){
        let others = [];
        if (elementsArrays==1){
            for (let arr of other){
                for (let element of arr){
                    others.push(element);
                }
            }
        } else{
            others = [...other];
        }

        if (type==0){
            
            let pt;
            let rays = [];
            
            let result = [];
            let min = 0;
            let furthest = null;
            const e = 0.000001;
            
            for (let i = 0; i < others.length; i++){
               
                if (others[i] instanceof Polygon || others[i] instanceof Boundary){
                    for (let j = 0; j < others[i].vertices.length; j++){
                        
                        const a = others[i].vertices[j];
                        const angle = returnAngle(this.pos, a);
                       

                        rays.push(new Ray(this.pos, angle-e));
                        rays.push(new Ray(this.pos, angle));
                        rays.push(new Ray(this.pos, angle+e));
                    }
                } else if (others[i] instanceof Point){
                    
                    const angle = returnAngle(this.pos, others[i]);
                    rays.push(new Ray(this.pos, angle));
                }
            }
           // printDisplay(""+rays[0]?.angle);
           printDisplay("rays l: ",rays.length);
          // printDisplay(polygons.length);
            for (let ray of rays){
                
                let max = Infinity;
            let closest = null;
            let d;
              //  ray.draw();
                for (let other of others){

                    if (other.type!="polygon"){
                        pt = ray.cast(other);
                        if (pt){
                           // drawLines(this.pos, [pt]);
                          //      drawDots([pt],5);
                            d = this.pos.distance(pt);
                            
                            if (d < max){
                                
                                max = d;
                                closest = pt;
                            }
                            // if (d > min){
                            //     min = d;
                            //     furthest = pt;
                            // }
                        }
                    } else {
                        
                        for (let j = 0; j < other.sides.length; j++){
                            
                            pt = ray.cast(other.sides[j]);
                            if (pt){
                                //drawDots([pt],5);
                                
                                d = this.pos.distance(pt);
                                
                                if (d < max){
                                    
                                    max = d;
                                    closest = pt;
                                }
                                // if (d > min){
                                //     min = d;
                                //     furthest = pt;
                                // }
                            }
                        }
                    }
                   
            }
            if (closest){
                result.push(closest);
            }


            }
            const tempp = this.pos;
            result.sort(function(a,b) {
                let angle_a;
                let angle_b;
    
                if (a.x<tempp.x){
                    angle_a=Math.PI+Math.atan( (a.y-tempp.y) / (a.x - tempp.x) );
                } else{
                    angle_a=Math.atan( (a.y-tempp.y) / (a.x - tempp.x) );
                }
    
                if (b.x<tempp.x){
                    angle_b=Math.PI+Math.atan( (b.y-tempp.y) / (b.x - tempp.x) );
                } else{
                    angle_b=Math.atan( (b.y-tempp.y) / (b.x - tempp.x) );
                }
    
                if (angle_a > angle_b){
                    return 1;
                }
                if (angle_a < angle_b){
                    return -1;
                } 
                return 0;
                
            })
           
        // drawDots(result);
       // drawLines(this.pos, result, 0.5);
        const visibility = new Polygon(result, "black", 1);
        return [visibility, result];
            
        
        //    drawTriangles(result, this.pos);

        }
    }

    findShadow(other, elementsArrays=1, front=0){
        let others = [];
        let targets = [];

        // add target objects to one array, exclude boundary ("walls");
        if (elementsArrays==1){
            for (let arr of other){
                if (arr!=walls){
                    for (let element of arr){
                        others.push(element);
                    }
                }
            }
            for (let arr of other){
                    for (let element of arr){
                        targets.push(element);
                    }
            }
        } else{
            others = other;
        }
        let allShadows=[];

        for (let element of others){
            let elementShadowPoints = [];
            let left = {};
            let right = {};
            let maxAngle = 0;

            // find leftmost and rightmost vertices from the objects PoV
            for (let i = 0; i < element.vertices.length; i++){
                const vertex = element.vertices[i];
    
                for (let j = i; j < element.vertices.length; j++){
                    const comparison = element.vertices[j];
                    const P12 = distance(this.pos, vertex);
                    const P13 = distance(this.pos, comparison);
                    const P23 = distance(vertex,comparison);
                    const P12pow = Math.pow(P12,2);
                    const P13pow = Math.pow(P13,2);
                    const P23pow = Math.pow(P23,2);
                    let ang = Math.acos((P12pow + P13pow - P23pow ) / (2 * P12 * P13));
                    
                    if (ang > maxAngle){
                        left = vertex;
                        right = comparison;
                        maxAngle = ang;
                    }
                }
            }

            // define a line between the vertices
            let trueLeft = {};
            let trueRight = {};
            const V1 = new Vector (left.x-this.pos.x, left.y-this.pos.y);
            const V2 = new Vector (right.x-this.pos.x, right.y-this.pos.y);
            const V1norm = V1.normalize();
            const V2norm = V2.normalize();
            let sumVector = new Vector(0,0);
            sumVector = V1norm.add(V2norm);
            sumVector.x /= 2;
            sumVector.y /= 2;
            sumVector = sumVector.scale(100);
            let sumCord = new Point(sumVector.x+this.pos.x, sumVector.y+this.pos.y);
            // define which point is left/right from object pov by comparing them
            // to the line
            if (isLeft(this.pos, sumCord, left)<0){
                trueLeft = left;
                trueRight = right;
            } else{
                trueLeft = right;
                trueRight = left;
            }
            const truePoints = [trueLeft, trueRight];


            // define the farther edge between leftmost & rightmost points of polygon
            // from object pov (farEdge -array)
            let farEdge = [];
            
            let runningPoint = trueLeft;
            let endPoint = trueRight;
            if (front==1){
                runningPoint = trueRight;
                endPoint = trueLeft;
            }
            const vertices = element.vertices;
            const length = vertices.length;
            let index = vertices.indexOf(runningPoint);
            farEdge.push(runningPoint);

                // "run" the edge
                while(!((runningPoint.x == vertices[vertices.indexOf(endPoint)].x)  &&  (runningPoint.y == vertices[vertices.indexOf(endPoint)].y)) ){
                    if (index < length-1){
                        index++;         
                    } else{
                        index=0;                  
                    }              
                    runningPoint = vertices[index];
                    farEdge.push(runningPoint);              
                }

            // cast rays to leftmost/rightmost to determine farthest hits

            
            let rays = [];
            let result = [];
            let farthest = null;

            for (let i = 0; i < 2; i++){
                const a = truePoints[i];
                const angle = returnAngle(this.pos, a);
                if (i==0){
                    rays.push(new Ray(this.pos, angle-0.00001));
                } else{
                    rays.push(new Ray(this.pos, angle+0.00001));
                }
            }
            
                for (let ray of rays){
                    
                    let d;
                    let pt;
                    let min = 0;
                    
                    for (let other of targets){
                        if (other.type!="polygon"){
                            pt = ray.cast(other);
                            if (pt){
                                d = this.pos.distance(pt);
                                if (d > min){
                                    min = d;
                                    farthest = pt;
                                }
                            }
                        } else {
                            for (let j = 0; j < other.sides.length; j++){
                                pt = ray.cast(other.sides[j]);
                                if (pt){                
                                    d = this.pos.distance(pt);                          
                                        if (d > min){
                                            min = d;
                                            farthest = pt;
                                        }
                                }
                            }
                        }
                    }
                    if (farthest){
                        result.push(farthest)
                    }
        
                }
        
                
                elementShadowPoints.push(result[1]);
               
                for (let vertex of farEdge){
                    elementShadowPoints.push(vertex);
                }
                elementShadowPoints.push(result[0]);
               // if (result[1]!=undefined){
                    
               // }
               printDisplay(result[0].x+" "+result[0].y);
               printDisplay(result[1].x+" "+result[1].y);
                if (result[0].x <= 0 && result[1].y <= 0){
                    elementShadowPoints.push({x: 0, y: 0});
                }
                if (result[0].x <= 0 && result[1].x >= width){
                    elementShadowPoints.push({x: 0, y: 0});
                    elementShadowPoints.push({x: width, y: 0});
                }
                if (result[0].y <= 0 && result[1].x >= width){
                    elementShadowPoints.push({x: width, y: 0});
                }
                if (result[0].x <= 0 && result[1].x >= width){
                    elementShadowPoints.push({x: 0, y: 0});
                    elementShadowPoints.push({x: width, y: 0});             
                }
                if (result[0].y <= 0 && result[1].y >= height){
                    elementShadowPoints.push({x: width, y: 0});
                    elementShadowPoints.push({x: width, y: height});
                }
                if (result[0].x >= width && result[1].y >= height){
                    elementShadowPoints.push({x: width, y: height});
                }
                if (result[0].x >= width && result[1].x <= 0){
                    elementShadowPoints.push({x: width, y: height});
                    elementShadowPoints.push({x: 0, y: height});
                }
                if (result[0].y >= height && result[1].x <= 0){
                    elementShadowPoints.push({x: 0, y: height});
                }
                if (result[0].y >= height && result[1].y <= 0){
                    elementShadowPoints.push({x: 0, y: height});
                    elementShadowPoints.push({x: 0, y: 0});
                }


                allShadows.push(elementShadowPoints);
              //  printDisplay(elementShadowPoints.length);
                const elementShadow = new Polygon(elementShadowPoints, "black", 0.8);
                elementShadow.update();


           
           // drawDots2([trueLeft, trueRight],10);
         
            //drawDots(elementShadowPoints,5);
            
           // drawLines(this.pos, [left,right],0.1);


        }
        return allShadows;
       // allShadows = [ [P11,P12,..], [P21, P22, ..], ... ]


    }
}