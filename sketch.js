var tower,towerImg;

var climber,climberImg,climberGroup;

var door,doorImg,doorGroup;

var ghost,ghostImg;

var invisibleBlock,invisibleBlockGroup;
var spookySound;
var gameState="play";

function preload(){
  towerImg=loadImage("tower.png");
  
  doorImg=loadImage("door.png");
  ghostImg=loadImage("ghost-standing.png");
  climberImg=loadImage("climber.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  spookySound.loop();
  tower=createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY=1;
  
  ghost=createSprite(200,200);
  ghost.addImage(ghostImg);
  ghost.scale=0.3
  
  doorGroup=new Group();
  climberGroup=new Group();
  invisibleBlockGroup=new Group();
}

function draw(){
  background(0);
  if(gameState==="play"){
   
  if(tower.y>400){
    tower.y=300;
  }
  
   if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  
    if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  
  if(keyDown("space")){
    ghost.velocityY=-3;
  }
  
  ghost.velocityY=ghost.velocityY+0.8;
 
    spawnDoor();
  
  if(climberGroup.isTouching(ghost)){
     ghost.velocityY=0 ;
  }
  
    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
     ghost.destroy();
      gameState="end";
  }

  drawSprites();
  }
  if(gameState==="end"){
      stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
}

function spawnDoor(){
  if(frameCount%240===0){
    door=createSprite(200,-50);
    climber=createSprite(200,20);
    invisibleBlock=createSprite(200,15);
      invisibleBlock.width = climber.width;
     invisibleBlock.height = 2;
    
    door.x=Math.round(random(120,400)) 
    climber.x=door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY=2;
    climber.velocityY=2;
    invisibleBlock.velocityY = 2;
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    door.lifetime=800;
    invisibleBlock.lifetime = 800;
    climber.lifetime=300;
    
    doorGroup.add(door);
    climberGroup.add(door);
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug=true;
   
 
   
    
  }
}