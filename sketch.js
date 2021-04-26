
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage, ground;
var FoodGroup, obstacleGroup;
var background, backgroundImage ;
var score=0;
var count;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var black;


function preload(){
  
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png", "Monkey_10.png");
  
  backgroundImage = loadImage("Background.jpg");
  
  bananaImage = loadImage("banana1.png");
  obstaceImage = loadImage("stone.png");
  black=loadImage("black.png");
 
}



function setup() {
  
  createCanvas(1000, 400);

  ground = createSprite(500, 400, 19000, 10);
  ground.visible=false;
  
  background = createSprite(0, 0, 1000, 400);
  
  background.addImage(backgroundImage);
  
  background.scale = 10;
  
  monkey = createSprite(80,395,20,20);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;
  background.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;

  obstaclesGroup = createGroup();
  FoodGroup = createGroup();

  score = 0;
  count = 0;

  
}


function draw() {
  background.velocityX = -3;

  
  if (gameState===PLAY){
    
    if (background.x < 0){
      background.x = background.width/2;
    }

    camera.position.x = monkey.x;
    camera.position.y = monkey.y;

    //jump when the space key is pressed
    if(keyDown("space") && monkey.y>300) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    monkey.collide(ground);
    spawnObstacles();
    food();
    
    if(FoodGroup.isTouching(monkey)){
      banana.destroy();
    score = score + 2;
    }
    switch(score){
        case 10: monkey.scale=0.12;
                break;
        case 20: monkey.scale=0.14;
                break;
        case 30: monkey.scale=0.16;
                break;
        case 40: monkey.scale=0.18;
                break;
        default: break;
    }
    
    if(obstaclesGroup.isTouching(monkey)){ 
      count = count + 1;
        monkey.scale=0.08;

        if (count === 3){
          gameState = END;
        }
  
    }
  }
   if (gameState === END) {

    obstaclesGroup.visible=false;
    FoodGroup.visible=false;
    monkey.visible=false;
    background.addImage(black)
    text("Game Over", 300,300)

  }
    drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, -290,200);

}

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(1000,370,0,0);
   obstacle.addImage(obstaceImage);
   obstacle.scale=0.1;
   obstacle.velocityX = -6         
   obstacle.lifetime = 300;
   obstaclesGroup.add(obstacle);

   camera.position.x = obstacle.x;
   camera.position.y = obstacle.y;
   
  obstacle.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
   
 }
}

function food(){
  
  if (frameCount % 80 === 0) {
    banana = createSprite(1000,340,40,10);
    banana.y = Math.round(random(120,250));
    banana.addImage(bananaImage);
    banana.velocityX = -10; 
    banana.scale=0.2;
    banana.lifetime = 300;
    

    FoodGroup.add(banana);
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
  }
}




