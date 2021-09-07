/*loadAnimation,addAnimation=multiple images of an objects
loadImage,addImage=single image of an object*/

var trex_images;//to store the images of the t-rex
var trex;//to create a sprite named as trex
var invisibleGround;
var ground;
var ground_image;
var cloud;
var cloud_image;
var obstacle;
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;
var cloud_group;
var obstacle_group;
var gameState="play";
var trex_collided;
var restart,restart_image;
var gameOver,gameOver_image;
var score=0
//loading the animation/images
function preload()
{
trex_images=loadAnimation("trex1.png","trex3.png","trex4.png");
ground_image=loadImage("ground2.png");
cloud_image=loadImage("cloud.png");
trex_collided=loadImage("trex_collided.png");
obstacle1=loadImage("obstacle1.png");
obstacle2=loadImage("obstacle2.png");
obstacle3=loadImage("obstacle3.png");
obstacle4=loadImage("obstacle4.png");
obstacle5=loadImage("obstacle5.png");
obstacle6=loadImage("obstacle6.png");
restart_image=loadImage("restart.png");
gameOver_image=loadImage("gameOver.png");
}


//create sprite,animation,velocity,shapeColor,scale,
function setup()
{
createCanvas(600,400);
trex=createSprite(50,200,20,20);
trex.scale=0.5;
trex.addAnimation("trex_running",trex_images);
trex.addAnimation("trexStop",trex_collided)
ground=createSprite(300,221);
ground.addImage("ground",ground_image);
ground.velocityX=-5;
invisibleGround=createSprite(300,226,1600,10);
invisibleGround.visible=false
gameOver=createSprite(300,90)
gameOver.addImage("gameover",gameOver_image)
restart=createSprite(300,120)
restart.addImage("restart",restart_image)
restart.scale=0.5
cloud_group=new Group()
obstacle_group=new Group()
}


function draw()
{
background("white");
//Play State
if(gameState=="play")
{
trex.velocityY=trex.velocityY+2;
score=score+Math.round(frameCount/120)//score++//score+=1
restart.visible=false
gameOver.visible=false
//making the ground infinite
ground.velocityX=-5
if(ground.x<0)
{
ground.x=ground.width/2
}
//making the trex jump upwards
if(keyDown("space") && trex.y>=197)
{
 trex.velocityY=-20; 
}

spawnClouds();
spawnObstacle();

//T-rex colliding with obstacle
if(trex.isTouching(obstacle_group))
{
gameState="end"
}

}

//End State
if(gameState=="end")
{
trex.velocityY=0
ground.velocityX=0
obstacle_group.setVelocityXEach(0)
cloud_group.setVelocityXEach(0)
obstacle_group.setLifetimeEach(-1)
cloud_group.setLifetimeEach(-1)
trex.changeAnimation("trexStop")
restart.visible=true
gameOver.visible=true
}
fill("black");
textSize(15);
text(mouseX+","+mouseY,mouseX,mouseY);

//gravity
trex.collide(invisibleGround);
if(mousePressedOver(restart))
{
reset();
}
drawSprites();
text("score="+score,500,30)
}
function spawnClouds()
{
if(frameCount%60==0)
{
clouds=createSprite(600,random(10,130))
clouds.addAnimation("cloud",cloud_image)
clouds.velocityX=-6
clouds.depth=trex.depth
trex.depth=trex.depth+1
clouds.lifetime=100
cloud_group.add(clouds)
}

}
function spawnObstacle()
{
if(frameCount%60==0)
{
obstacle=createSprite(610,200,20,20)
obstacle.velocityX=-5
var storing_numbers=Math.round(random(1,6))
obstacle.scale=0.5
switch(storing_numbers)
{
case 1:
obstacle.addImage(obstacle1)
break;   
case 2:
obstacle.addImage(obstacle2)
break;
case 3:
obstacle.addImage(obstacle3)
break;
case 4:
obstacle.addImage(obstacle4)
break;
case 5:
obstacle.addImage(obstacle5)
break;
case 6:
obstacle.addImage(obstacle6)
break;
default:
break;
}
obstacle_group.add(obstacle)
}
}
function reset()
{
gameState="play"
trex.changeAnimation("trex_running")  
restart.visible=false
gameOver.visible=false
obstacle_group.destroyEach()
cloud_group.destroyEach()
score=0
}















