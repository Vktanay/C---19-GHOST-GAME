var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group()
ghost = createSprite(300,400,10,10)
ghost.addImage(ghostImg)
ghost.scale = 0.4

spookySound.play();

}

function draw() {
  background(200);
  if(gameState === "play"){
    if(tower.y > 400){
      tower.y = 300 
    }
    if(keyDown("UP_ARROW")){
      ghost.velocityY = -5
    }
    ghost.velocityY = ghost.velocityY + 0.1

    if(keyDown("RIGHT_ARROW")){
      ghost.x = ghost.x + 5
    }
    if(keyDown("LEFT_ARROW")){
      ghost.x = ghost.x - 5
    }

    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0
    }
    if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
      gameState = "end"
    }

    spawnDoors();
    drawSprites()
  }

if(gameState == "end"){
background("black")
textSize(20)
fill ("green")
text ("GAME OVER",250,250)
}
}

function spawnDoors(){
  if(frameCount%240 == 0){
   door = createSprite(Math.round(random(120,400)),-50,20,20) 
   door.addImage(doorImg)
   door.velocityY = 1

   climber = createSprite(door.x,10,20,20)
   climber.addImage(climberImg)
   climber.velocityY = 1

   invisibleBlock = createSprite(climber.x,12,climber.width,2)
   invisibleBlock.velocityY = 1
   invisibleBlock.debug = true

  ghost.depth = door.depth +2
   doorsGroup.add(door)
   climbersGroup.add(climber)
   invisibleBlockGroup.add(invisibleBlock)
  
  }
}
