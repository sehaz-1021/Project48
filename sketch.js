var BEGIN=0;
var PLAY = 1;
var END = 2;
var life=3;
var count=0;
var gameState = BEGIN;
var speed;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;
var bullet;
var backgroundImg
var score=0;
var jumpSound, collidedSound;
var bulletImg;
var gameOver, restart;


function preload(){
  jumpSound = loadSound("assets/sounds/jump.wav")
  collidedSound = loadSound("assets/sounds/collided.wav")
  gunSound = loadSound("assets/sounds/gun.mp3");
  bonusSound = loadSound("assets/sounds/win.wav");
  gameOverSound=loadSound("assets/sounds/gameover.wav");
  startSound=loadSound("assets/sounds/start.wav");
  
  backgroundImg = loadImage("assets/background.jpg")
  sunAnimation = loadImage("assets/sun.png");
  
  trex_running = loadAnimation("assets/trex_2.png","assets/trex_1.png","assets/trex_3.png");
  trex_collided = loadAnimation("assets/trex_collided.png");
  
  groundImage = loadImage("assets/blackGround.jpg");
  
  cloudImage = loadImage("assets/cloud.png");
  bg=loadImage("assets/background.jpg");
  obstacle1 = loadImage("assets/obstacle1.png");
  obstacle2 = loadImage("assets/obstacle2.png");
  obstacle3 = loadImage("assets/obstacle3.png");
  obstacle4 = loadImage("assets/obstacle4.png");
  gun = loadImage("assets/shootingPlayer.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
    sky = loadImage("assets/sky.jpeg");
    corona = loadImage("assets/corona2.png");
    corona2 = loadImage("assets/corona.png");

    manDied = loadImage("assets/manDied.png");
    bulletImg = loadImage("assets/bullet.png");
    YouWinImg = loadImage("assets/youWin.png");
goodImg = loadImage("assets/good.png");
 maskImg=loadImage("assets/mask.png");
 sanitizerImg=loadImage("assets/sanitiser.png");
 disapointedImg=loadImage("assets/disappointed.png");
 heartImg=loadImage("assets/life.png");
thinkingBoyImg=loadImage("assets/thinkingboy.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  sun = createSprite(width-80,100,10,10);
  sun.addAnimation("sun", sunAnimation);
  sun.scale = 0.3
  
  trex = createSprite(camera.x+displayWidth/2,height-70,20,50);
  trex.x = 750

  speed=random(83,90);
  bullet= createSprite(trex.x,trex.y-50,5,5);
  bullet.addImage(bulletImg);
 bullet.scale=0.1
 bullet.visible = false;

 youWin = createSprite(700,150);
 youWin.addImage(YouWinImg);
 youWin.visible = false;
 youWin.scale = 0.2

 good = createSprite(550,200);
 good.addImage(goodImg);
 good.scale=0.9
 good.visible=false;

heart=createSprite(170,45);
heart.addImage(heartImg);
heart.scale=0.06;
heart.visible=false;

emoji = createSprite(550,200);
emoji.addImage(disapointedImg);
emoji.visible=false;
emoji.lifetime=2;
 trex.addAnimation("running", gun);
  trex.addAnimation("collided", manDied);
  trex.setCollider('rectangle',0,0,500,1100)
  trex.scale = 0.15
 
   //trex.debug=true;
  
   thinkingboy=createSprite(200,400);
thinkingboy.addImage(thinkingBoyImg);
thinkingboy.visible=false;
thinkingboy.scale=0.2



  invisibleGround = createSprite(width/2,height-10,width,125);  
  invisibleGround.shapeColor = "black";
  
  ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImage);
  ground.x = width/2
  //ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(width,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(windowWidth-700,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;
  
 
  // invisibleGround.visible =false

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  bulletGroup = new Group();
  maskGroup= new Group();
  score = 0;
  life=3;
  count=0;
}

function draw() {
 
  camera.x = trex.x-750;
  gameOver.position.x = restart.position.x - camera.x;
  camera.position.x = windowWidth/2;

  //trex.debug = true;
  background( backgroundImg);
  
  
  if (gameState===PLAY){
    strokeWeight(4);
    stroke("blue");
    textSize(25);
    text("Score: "+ score,30,50);
    strokeWeight(4);
    stroke("red");
    textSize(25);
    text(" : "+life,200,50);
    heart.visible=true;
    trex.visible = true;
    //score = score + Math.round(getFrameRate()/60);
   thinkingboy.visible=false;
    ground.velocityX = -(6 + 3*score/100);
    if(score===500){
      good.visible=true;
    }
    else{
      good.visible=false;
    }
    if((touches.length > 0 || keyDown("SPACE")) && trex.y  >= height-220) {
      jumpSound.play( )
      trex.velocityY = -23;
       touches = [];
    }
    
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
   
    trex.collide(invisibleGround);
    if(keyCode===120){
      
      createBullet();
      gunSound.play();
      
      
 }

    spawnClouds();
    spawnObstacles();
    spawnMask();
   
 if(obstaclesGroup.isTouching(bulletGroup)){
   obstaclesGroup.destroyEach();
   bulletGroup.destroyEach();
  score=score+50;
 }   

if(maskGroup.isTouching(trex)){
  maskGroup.destroyEach();
  bonusSound.play();
  count=count+1;
  
} 
if(count===5){
  life=life+1;
  count=0;
}
if(life===0){
  gameState = END;
  gameOverSound.play();
}
if(obstaclesGroup.isTouching(trex)){
  obstaclesGroup.destroyEach();
  collidedSound.play()
  life=life-1;
  emoji.visible=true;
 
 
}

 if(score===100){
   gameState="Win"
   
 }
    
   
  }
  
  else if (gameState === END) {
    trex.changeAnimation("collided",manDied);
    gameOver.visible = true;
    restart.visible = true;
    maskGroup.destroyEach();
   heart.visible=false;
//youWin.visible=false;
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    maskGroup.setVelocityEach(0);
    //change the trex animation
    strokeWeight(4);
  stroke("green");
  textSize(25);
  fill("black");
    text("Try again your score is "+score,500,200)
    text("Press space to Restart the Game",500,230)
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    maskGroup.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      touches = []
    }
  }
  else if(gameState==="Win"){
    //changeAnimation("collided",manDied);
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    maskGroup.setVelocityXEach(0);
   youWin.visible=true;
   heart.visible=false;
   trex.visible=true;
    //change the trex animation
    trex.y=500
    ground.velocityX = 0;
    trex.velocityY = 0;
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    maskGroup.setLifetimeEach(-1);
    strokeWeight(4);
  stroke("green");
  textSize(25);
  fill("black");
    text("Congratulations!! your score is "+score,500,300)
    text("Press space to Restart the Game",500,330)
    
    if(touches.length>0 || keyDown("SPACE")) {      
      reset();
      youWin.visible=false;
      touches = []
    }
  }
 else if(gameState===BEGIN){
//background(bg);
thinkingboy.visible=true;
  strokeWeight(4);
  stroke("green");
  textSize(25);
  fill("black");
  text("Instructions :",800,200);
  fill("black");
  stroke("yellow");
text("Press Enter to start the game",800,400)
fill("black");
stroke("blue");
text("Press Space to jump",800,300);
fill("black");
stroke("purple");
 text("Score atleast 1000 to win the the game",800,350);
 fill("black");
 stroke("white");
  text("Press x to shoot",800,250);
  fill("black");
stroke("red");
 text("Collect 5 masks/sanitizer to get more lives",800,450);
fill("white");
stroke("black");
textSize(35);
 text("Corona!!!!!",300,510);
 fill("black");
stroke("black");
textSize(40);
 text("LET'S KILL IT",500,100);
 
  trex.visible=false;

  if(keyDown("Enter")){
    gameState=PLAY;
    startSound.play();

  }
 }
drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(camera.x+width/2,height-300,40,10);
    cloud.y = Math.round(random(100,190));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 500;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(camera.x+width/2,height-random(400,220,300,500),20,30);
    obstacle.setCollider('circle',0,0,120)
     //obstacle.debug = true
  
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(corona);
              //obstacle.scale = 0.2;
              break;
      case 2: obstacle.addImage(corona2);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    obstacle.depth = trex.depth;
    trex.depth +=1;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnMask(){
  if(frameCount % 190 === 0) {
    var mask = createSprite(camera.x+width/2,height-random(200,600),20,30);
    mask.setCollider('circle',0,0,200)
  //mask.debug = true
  
   mask.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: mask.addImage(maskImg);
              //obstacle.scale = 0.2;
              break;
      case 2: mask.addImage(sanitizerImg);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    mask.scale = 0.2;
    mask.lifetime = 300;
    mask.depth = trex.depth;
    trex.depth +=1;
    //add each obstacle to the group
   maskGroup.add(mask);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  maskGroup.destroyEach();
  
  trex.changeAnimation("running",gun);
  
  score = 0;
  life=3;
  count=0;
}

function createBullet() {
  var bullet= createSprite(500, 100, 60, 10);
  bullet.addImage(bulletImg);
  bullet.y=trex.y;
  bullet.x = trex.x;
  bullet.velocityX = 20;
  bullet.lifetime = 150;
  bullet.scale = 0.1;
  bulletGroup.add(bullet);
  return bullet;
   
}

