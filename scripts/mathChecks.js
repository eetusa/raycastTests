function distance(x1, y1, x2, y2){
    if (x2 === undefined){
        return Math.sqrt(Math.pow(y1.x-x1.x,2)+Math.pow(y1.y-x1.y,2));
    }
    return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
}

function pointInRadius(P1, P2, radius){
    return distance(P1.x, P1.y, P2.x, P2.y) < radius;
}

// tests if a point os Left|On|Right on an infinite line
// return > 0 P2 left of line through P0 and P1
//        = 0 on line
//        < 0 right of the line
// http://geomalgorithms.com/a03-_inclusion.html
function isLeft(P0, P1, P2){
    return ( (P1.x - P0.x) * (P2.y - P0.y) - (P2.x - P0.x) * (P1.y - P0.y) );
}

// point in polygon winding number test
// P point that is being tested
// V[] vertex points of a polygon V[n+1] with V[n]=V[0]
// http://geomalgorithms.com/a03-_inclusion.html
function pointInPolygon(P, pointArray){
    if (P===undefined || pointArray===undefined)return;
    const n = pointArray.length;
    let V = [...pointArray];
    V.push(pointArray[0]);
    V.push(pointArray[1]);
    let wn = 0;

    for (let i = 0; i < n; i++) {
        if (V[i].y <= P.y) {
            if (V[i+1].y  > P.y){
                 if (isLeft( V[i], V[i+1], P) > 0){
                     ++wn;
                 }
            }
        } else {
            if (V[i+1].y  <= P.y){
                 if (isLeft( V[i], V[i+1], P) < 0){
                     --wn;
                 }
             }
        }
    }
    return wn;
}

// returns the angle between a line P1->P2 and x-axis (unit circle)
// P1, P2, 
function returnAngle(P1, P2){
    if (!(P1 && P2))return; 
    let angle = Math.atan2(P2.y - P1.y, P2.x - P1.x);
    if (angle < 0){angle+=2 * Math.PI};


    return angle;
}


function randomIntFromRange(min,max){
    
    if (max==undefined){
        max = 0;
        return Math.floor(Math.random() * (max - min +1 ) + min);
     }
    return Math.floor(Math.random() * (max - min +1 ) + min);
}

function returnPolygonIntersect(polygonArray){
    let intersectPoints = [];
    const arr = [...polygonArray];
    for (let i = 0; i < arr.length; i++){
       
            for (let j = i+1; j < arr.length; j++){
                if ( checkRectangleOverlap(arr[i].bounding, arr[j].bounding) ){
                    
                    for (let side1 of arr[i].sides){
                        for (let side2 of arr[j].sides){
                            const coll = getLineIntersection(side1.a, side1.b, side2.a, side2.b); 
                            if (coll!=null)intersectPoints.push(new Point(coll[0],coll[1]));
                        }
                    }
                }
            }
        
    }
    return intersectPoints;
}

function checkRectangleOverlap(box1, box2){
    const x1min = box1.x1;
    const x1max = box1.x2;
    const y1min = box1.y1;
    const y1max = box1.y2;
    const x2min = box2.x1;
    const x2max = box2.x2;
    const y2min = box2.y1;
    const y2max = box2.y2;
  return (x1min <= x2max && x2min <= x1max && y1min <= y2max && y2min <= y1max); 
}

function getLineIntersection(P0, P1, P2, P3) {
    const p0_x = P0.x;
    const p0_y = P0.y;
    const p1_x = P1.x;
    const p1_y = P1.y;
    const p2_x = P2.x;
    const p2_y = P2.y;
    const p3_x = P3.x;
    const p3_y = P3.y;
    let s1_x, s1_y, s2_x, s2_y; 
    s1_x = p1_x - p0_x; 
    s1_y = p1_y - p0_y; 
    s2_x = p3_x - p2_x; 
    s2_y = p3_y - p2_y; 
    let s, t; 
    s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / (-s2_x * s1_y + s1_x * s2_y); 
    t = ( s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / (-s2_x * s1_y + s1_x * s2_y);
    if (s >= 0 && s <= 1 && t >= 0 && t <= 1){  // Collision detected 
        let intX = p0_x + (t * s1_x); var intY = p0_y + (t * s1_y); 
        return [intX, intY];
    } 
    return null; // No collision 
}