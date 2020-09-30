function drawDots(array, size = 2, transparency = 1){
    if (array.length == 0)return;
    c.globalAlpha = transparency; 
    try{
    for (let i = 0; i < array.length; i++){
        c.beginPath();
        c.arc(array[i].x, array[i].y, size, 0, Math.PI * 2, false);
        c.fillStyle = "rgb(255,255,255)";
        c.fill();
        c.closePath();
    }
    }catch (err){
        console.log(err);
    }
    c.globalAlpha = 1;
}

function drawLines(start, endPointArray, brightness){
    const pos = start;
    const array = endPointArray;
    for (let i = 0; i < array.length; i++){
       
        c.globalAlpha = brightness;
          c.strokeStyle="rgb(200,200,200)";
          c.beginPath();
          c.moveTo(pos.x,pos.y);
          c.lineTo(array[i].x,array[i].y);
          c.stroke();
          c.closePath();
          
         c.globalAlpha = 1;
  
      }

}

function drawDots2(array, size = 2, transparency = 1){
    if (array.length == 0)return;
    c.globalAlpha = transparency; 
    for (let i = 0; i < array.length; i++){
        c.beginPath();
        c.arc(array[i].x, array[i].y, size, 0, Math.PI * 2, false);
        c.fillStyle = colors2[i];
        c.fill();
        c.closePath();
    }
    c.globalAlpha = 1;
}

function drawTriangles(array, pos){  
    if (array.length<3){
        return;
    }
    for (let i = 1; i < array.length-1; i++){
        drawTriangle(array[i-1],array[i],pos)
    }
    drawTriangle(array[array.length-1],pos,array[array.length-2]);
    drawTriangle(array[array.length-1],pos,array[0]);
}

function drawTriangle(pos1,pos2,pos3){
    
    c.beginPath();
    c.moveTo(pos1.x, pos1.y);
    c.lineTo(pos2.x, pos2.y);
    c.lineTo(pos3.x, pos3.y);
   
    c.closePath();
   
    c.fillStyle="rgba(255,255,255,0.5)";
    
    c.fill();
    c.strokeStyle="rgb(255,255,255)";
    c.lineWidth = 1;
  
    c.stroke();
}

function drawInvertPolygon(polygon, alpha){
    if (polygon===undefined)return;
    
    let points = [];
    if (polygon.vertices===undefined){
        points = polygon;
    } else{
        points = polygon.vertices;
       
    }
 c.globalAlpha=alpha;
    c.moveTo(0,0);
    c.lineTo(0,height);
    c.lineTo(width,height);
    c.lineTo(width,0);
    c.lineTo(0,0);
    c.closePath();

    c.moveTo(points[0].x,points[0].y);
    for (let i = 1; i < points.length; i++){
        c.lineTo(points[i].x, points[i].y);
    }
    c.lineTo(points[0].x,points[0].y);
    c.closePath();

    c.fillStyle="black";
    c.fill();
    c.globalAlpha=1;
}