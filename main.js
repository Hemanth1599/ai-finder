status = "";
objects = [];

function setup(){
    canvas = createCanvas(640,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Objects Detecting";
    object_name = document.getElementById("object_type").value;
    
}

function modelLoaded(){
    console.log("modelLoaded!");
    status = true;
}

function draw(){
    image(video , 0 , 0 , 640 , 500);

    if(status != ""){
        objectDetector.detect(video , gotResults);

        r = random(255);
        g = random(255);
        b = random(255);

        for(i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            if(objects[i].label == object_name){
            document.getElementById("found_or_not").innerHTML = object_name + " Found";
            }else{
            document.getElementById("found_or_not").innerHTML = object_name + " Not Found"
            }
              
            fill('#FF0000');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}
}

function gotResults(error , result){
    if(error){
        console.error(error);
    }else{
        console.log(result);
        objects = result;
    }
}

