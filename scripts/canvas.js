// Despair - Goratie
// move around world. at some point a new source spawns?
//
// combine polygons / add crosspoints as vertices
// Init
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.style.cursor = "none";

canvas.width = canvas.offsetWidth;
canvas.height= canvas.offsetHeight;
const width = canvas.width;
const height = canvas.height;

// Variablesss
let mouse = {
    x: 0,
    y: 0
}

const colors = [
    '#2185C5',
    '#7ECEFD',
    '#FFF6E5',
    '#FF7F66'
]

const colors2 = [
    "red",
    "green",
    "blue",
    "yellow",
    "purple",
    "orange"
]

// Eventlisteners
canvas.addEventListener("mousemove", function(event){
    mouse.x = event.clientX - (canvas.offsetLeft - window.pageXOffset);
    mouse.y = event.clientY- (canvas.offsetTop - window.pageYOffset);
});



// Utility functions

function printDisplay(param1, ...args){
    const display = document.getElementById("display");
    let child = document.createElement('div');
    child.textContent = param1 + ": ";
    args.forEach((arg) => {
        if (typeof arg == "number"){
            if (arg < 10){
                arg = arg.toFixed(3);
            }
            
        }
        child.textContent = child.textContent + " " + arg;
    })
    display.appendChild(child);
}

function removeAllChildNodes(display) {
    while (display.firstChild) {
        display.removeChild(display.firstChild);
    }
}

function randomColor(color){
    return colors[Math.floor(Math.random()*colors.length)];
}

function addRandomPolygons(array, n){
    let temp = array;
    for (let i = 0; i < n; i++){
        let vertices = randomIntFromRange(3,4);
        let cx = randomIntFromRange(width-50)+50;
        let cy = randomIntFromRange(height-50)+50;
        let P = [];
        let fill = 0;
        let color = "yellow";
        let set = 1;
        if (Math.random>0.5){
            fill = 1;
        }
        for (let j = 0; j < vertices; j++){
            P.push({x: cx+randomIntFromRange(-50,50), y: cy+randomIntFromRange(-50,50)});
        }
        for (let j = 0; j < temp.length; j++){
            if ((pointInPolygon(P,temp[j].vPoint))){
                set = 0;
                i = i-1
            }
        }
        if (set)temp.push(new Polygon(P, color, 1, color,1));
    }
    return temp;
}

Array.prototype.addRandomPolygons = function(n){
    let temp = this;
    for (let i = 0; i < n; i++){
        let vertices = randomIntFromRange(3,3);
        let cx = randomIntFromRange(width-50)+50;
        let cy = randomIntFromRange(height-50)+50;
        let P = [];
        let fill = 0;
        let color = "yellow";
        let set = 1;

        
        if (Math.random>0.5){
            fill = 1;
        }
        
        for (let j = 0; j < vertices; j++){
            P.push({x: cx+randomIntFromRange(-50,50), y: cy+randomIntFromRange(-50,50)});
        }
        
        for (let j = 0; j < temp.length; j++){
            
            for (let k = 0; k < P.length; k++){
                if (pointInPolygon(P[k],temp[j].vertices)!=0){
                   
                    set = 0;
                    i = i-1;
                    k = P.length;
                    
                    j = temp.length;
                }
            }
        }
        
        if (set){
            temp.push(new Polygon(P));
        }
    }
   
}

Array.prototype.addRandomPolygons2 = function(n){
    
    const temp = this;

    for (let u = 0; u < n; u++){
        let set=1;
        const radius = randomIntFromRange(20,100);
        const vertices = randomIntFromRange(3,9);
        let angles = [];
        const cx = randomIntFromRange(radius+1,width-radius-1);
        const cy = randomIntFromRange(radius+1,height-radius-1);
       // console.log(cx,cy)
        let P = [];
        const variance = randomIntFromRange(0,radius/3);

        for (let i = 0; i < vertices; i++){
            const angle = Math.random()*Math.PI*2;
            if (angles.indexOf(angle)==-1){
                angles.push(angle);
            } else{
                i--;
            }
        }

        angles.sort(function (a,b){
            if (a<b){
                return -1;
            }
            if (a>b){
                return 1;
            }
            return 0;
        });
       // console.log(angles);
        
        for (let g = 0; g < vertices; g++){
            const d = randomIntFromRange(radius-variance, radius);
            let point = {};
            point.x = cx+Math.cos(angles[g])*d;
            point.y = cy+Math.sin(angles[g])*d;
            P.push(point);
        }

        // for (let j = 0; j < temp.length; j++){
                
        //     for (let k = 0; k < P.length; k++){
        //         if ((pointInPolygon(P[k],temp[j].vertices))){
                    
        //             set = 0;
        //             u = u-1
        //             k = P.length;
        //         }
        //     }
        // }
      //  console.log(P);
      
        if (set)temp.push(new Polygon(P));
      // if (set)console.log(new Polygon(P));
    }
        
       
 
        
   
}

function printLog(){
		let print = "";
		for (let j = 0; j < arguments.length; j++){
			if (typeof arguments[j] === 'object'){
				for (let i = 0; i < Object.keys(arguments[j]).length; i++){
					print = print + "" + Object.keys(arguments[j])[i] + ": " + Object.values(arguments[j])[i] + ", ";
				}
			} else{
				print = print + '"' + arguments[j] + '", ';
			}
			
		}
		print=print.slice(0,print.length-2);
		printDisplay(print);
}

function drawPolygon(){

}

function handleClick(e){
    if (e==0){
        
        for (let arr of movables){
            for (let obj of arr){
                if (obj instanceof Polygon){
                    if (pointInPolygon(mouse, obj.vertices)){
                        console.log("click");
                        obj.followMouse = 1;
                        
                        moving.push(obj);
                    }
                }
            }
        }
    } else if (e==1){
        if (moving.length!=0){
          for  (let obj of moving){
            obj.followMouse=0;
          }
          raychecks.pop();
          intersections = returnPolygonIntersect(polygons);
          raychecks.push(intersections);
          moving=[];
        }
    }
}


// Implementation


let walls = [];
let polygons = [];
let raychecks = [];
let source = {};
let movables = [];
let moving = [];

let intersections = [];

function init(){
    // walls.push( new Boundary(200,200,100,100) );
   
    canvas.addEventListener('mousedown', e => {
        handleClick(0);
    });

    canvas.addEventListener('mouseup', e => {
        handleClick(1);
    })
    
    // polygons.push( new Polygon([{x: 200, y: 100},{x:300,y:100}, {x: 350, y:250}, {x: 150, y: 300}, {x: 150, y: 200}]));
    // polygons.push( new Polygon([{x: 000, y: 500},{x:500,y:100}, {x: 550, y:250}]));
   polygons.addRandomPolygons2(10);
    
    walls.push(new Boundary(0,0,width,0));
    walls.push(new Boundary(0,0,0,height));
    walls.push(new Boundary(width,0,width,height));
    walls.push(new Boundary(0,height,width,height));
    source = new Particle(10,10,1,1,0);
 //   source2 = new Particle(400,400,1,1,0);
    
    intersections = returnPolygonIntersect(polygons);
    
    raychecks.push(walls);
    raychecks.push(polygons);
    raychecks.push(intersections);
    movables.push(polygons);

}

function animate(){
    
    requestAnimationFrame(animate);
    c.globalCompositeOperation="source-over";
    removeAllChildNodes(document.getElementById("display"));
    c.clearRect(0,0,canvas.width, canvas.height);
    c.fillStyle = "white";
    c.fillText(`o`, mouse.x, mouse.y);

    source.update();
    polygons.forEach(polygon => polygon.update());
    walls.forEach(wall => wall.update());
 
    const visibleArea = source.look(raychecks, 0);
   // drawLines(mouse, visibleArea[0].vertices)
     drawInvertPolygon(visibleArea[0].vertices, 0.8);    
  //   drawDots(intersections);
  //   source.drawMasks();
 //   drawLines(source.pos, visibleArea[0].vertices);

    mouse.pastX = mouse.x;
    mouse.pastY = mouse.y;
    

   // printDisplay("hiiri x y", mouse.x, mouse.y);
   // printDisplay("angle",returnAngle({x: mouse.x, y: mouse.y},walls[0].a));
  //  printDisplay("polymäärä",polygons.length);

}

init();
animate();
