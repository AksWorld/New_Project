img="";
Status="";
objects=[];


function preload(){
   alarm=loadSound('perfect_alarm.mp3'); 
}

function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start()
{   objectDetector=ml5.objectDetector("cocossd",modelLoaded);
     document.getElementById("status").innerHTML="Status: Detecting Objects";
}



function draw(){
  image(video,0,0,380,380);
  if(Status != ""){
    r=random(255);
    g=random(225);
    b= random(255);
    objectDetector.detect(video,gotResult)
    for(i=0; i< objects.length; i++){
  
       fill(r,g,b);
       percent=floor(objects[i].confidence*100);
       text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
       noFill();
       stroke(r,g,b);
       rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
       console.log(objects.length);

      if(objects[i].label=="person"){
        alarm.stop();
        document.getElementById("status").innerHTML="Baby detected";
        document.getElementById("start_model").innerHTML="Baby Found";
        console.log(objects[i].label);
      }
      else{
        alarm.play();
        document.getElementById("status").innerHTML="Baby not detected";
        document.getElementById("start_model").innerHTML="Baby Not Found";
     } 
    }
    
   if(objects.length==0){
    alarm.play();
    document.getElementById("status").innerHTML="Baby not detected";
    document.getElementById("start_model").innerHTML="Baby Not Found";
  
  }
  }
}

function modelLoaded(){
    console.log("Tis the season to be jolly fa la la la  la la la la LAAAAAAAAAA!!!");
    Status=true;
    objectDetector.detect(video,gotResult)
}

function gotResult(error,results){
  if(error){
    console.log(error);
  }
  console.log(results);
  objects=results;
}