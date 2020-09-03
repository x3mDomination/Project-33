const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];
var divisionScores = [500,200,100];

var divisionHeight=300;
var score =0;

var ground,leftWall,rightWall;

var particle;
var turn = 0;
var gameState = "PLAY";
localStorage["high score"] = 0;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);
  leftWall = new Ground(0,400,20,height);
  rightWall = new Ground(800,400,20,height);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    

    
}
 


function draw() {
  background("black");
  textSize(20)
  text("Score : "+score,20,30);
  text("High Score: "+localStorage["high score"],600,30);
  Engine.update(engine);
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   /*
   if(frameCount%60===0){
     particles.push(new Particle(random(width/2-200, width/2+200), 10,10));
     score++;
   }
 
  for (var j = 0; j < particles.length; j++) {
   
     particles[j].display();
   }
   */
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

   for(var q = 25;q < width;q = q + 80) {
    if(q<80||q>720){  
      text(divisionScores[0],q,height-280);
    }
    else if((q<240&&q>80)||(q>560&&q<720)){
      text(divisionScores[1],q,height-280);
    }
    else {
      text(divisionScores[2],q,height-280);
    }
  }

  if(particle!==undefined&&particle.body!==null){
    var position = particle.body.position;
    particle.display();
    if(particle.body.position.y>height-320){
      if((position.x<80||position.x>720)&&particle.gameState==="falling"){  
        score = score + divisionScores[0];
        turn++;
      }
      else if(((position.x<240&&position.x>80)||(position.x>560&&position.x<720))&&particle.gameState==="falling"){
        score = score + divisionScores[1];
        turn++;
      }
      else if((position.x<560&&position.x>240)&&particle.gameState==="falling") {
        score = score + divisionScores[2];
        turn++;
      }
      particle.gameState = "notFalling";
    }
  }

  if(turn >= 5){
    gameState = "END";
    if(localStorage["high score"] < score){
      localStorage["high score"] = score;
    }
    textSize(75);
    text("Game Over!",175,350);
  }
}

function mousePressed(){
  if(gameState==="PLAY"){
    if(particle!==undefined){
      particle.delete();
    }
    particle = new Particle(mouseX,10,10);
    divisionPoints();
  }
}

function keyPressed(){
  if(gameState === "END"){
    if(keyCode === 32){
      gameState = "PLAY";
      score = 0;
      turn = 0;
      particle.delete();
    }
  }
}

function divisionPoints(){
    for(var p = 0; p < 3; p++){
      var rand = Math.ceil(random(-6,6));
      divisionScores[p] = 250 + (rand * 50);
    }
}