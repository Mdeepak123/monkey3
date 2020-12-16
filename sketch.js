var PLAY = 1;
var END = 0;

var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage, ground;
var FoodGroup, ObstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  banana_image = loadImage("banana.png");
  obstacle_image = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400,400);
  
  monkey = createSprite(80, 325, 20, 20);
  monkey.addAnimation('run',monkey_running);
  monkey.scale = 0.1;
  monkey.debug = false;
  monkey.setCollider("rectangle",0,0,monkey.height, monkey.width);
  
  ground = createSprite(200,360,400,20);

  FoodGroup = new Group();
  ObstacleGroup = new Group();

  score = 0;
}


function draw() {
  background("white");

  if(gameState === PLAY){

    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -4;
    
    if(frameCount%300 === 0){
      
      spawn_obstacle();
      
    }
    
    if(frameCount%80 === 0){
      
      spawn_food();
      
    }
    
    if(keyDown("space") && monkey.y >= 310){
      
      monkey.velocityY = -12;
      
    }
    monkey.velocityY = monkey.velocityY + 0.5;
    
    ground.x = ground.width/2;
    
    if(monkey.isTouching(FoodGroup)){
      
      FoodGroup.destroyEach();
      score = score +10;
      
    }
    
    if(monkey.collide(ObstacleGroup)){
      
      gameState = END;
      
    }
    
  }
  
  else if(gameState === END){
    textSize(20);
    text("Game Over 😭",150,100);
    
    ObstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    ground.velocityX = 0;
    
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    
    ObstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0); 
    
  }
  
  monkey.collide(ground);
  textSize(20);
  text("Survival Time: " + score, 130, 30);
  
  drawSprites();
}

function spawn_obstacle(){
    
  obstacle = createSprite(400,330, 20, 20);
  obstacle.addImage(obstacle_image);
  obstacle.velocityX = -(4+score/100);
  ObstacleGroup.add(obstacle);
  obstacle.scale = 0.2;
  obstacle.lifetime = 200;
  obstacle.debug = false;
  obstacle.setCollider("circle",0,0,120);
  
}

function spawn_food(){
  
  banana = createSprite(400,Math.round(random(120,200)), 20, 20);
  banana.addImage(banana_image);
  banana.velocityX = -(4 + score/100);
  FoodGroup.add(banana);
  banana.scale = 0.2;
  banana.lifetime = 200;
  
}




