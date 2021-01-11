var playerImg, playLazer, compImg, comLazer, asteroidImg;
var player, playerLife, playerLazer;
var compPlay, compLazer;
var asteroidsGroup;
var score=0;

function preload(){
playerImg = loadImage("player.png");
playLazer = loadImage("playerLazer.png");
compImg = loadImage("compplay.png");
comLazer = loadImage("compLazer.png");
asteroidImg = loadImage("asteroid.png");
}

function setup(){

  createCanvas(650,650);
  player = createSprite(320,200,20,20);
  player.addImage(playerImg);
  player.scale = 1.5;
  compPlay = createSprite(340,300,20,20);
  compPlay.addImage(compImg);
  compPlay.scale = 1.5;
  asteroid = createSprite(650,1,20,20);
  asteroid.addImage(asteroidImg);
  playerLazer = createSprite(player.x, player.y,10,10);
  playerLazer.addImage(playLazer);
  playerLazer.x = mouseX;
  playerLazer.y = mouseY;
  compLazer = createSprite(1,1,10,10);
  
 
}

function draw(){
background("black");

if(player.x>650){
    score = score+1;
}

textSize(20);
stroke(22,100,7);
text("Player Score: "+score,20,600);

if(player.isTouching(asteroid) && score>1){
  score = score-0.2;
}


if (keyDown(UP_ARROW))
 {
   player.velocityX = 0;
   player.velocityY = -3;
 }
 
  if (keyDown(DOWN_ARROW)) {
    player.velocityY = 3;
    player.velocityX = 0;
  }
 
 
 if (keyDown(RIGHT_ARROW))
 { 
  player.velocityX = 3;
  player.velocityY = 0;
 }

if(player.velocityX>0){
  compPlay.velocityX = 3;
}

 if(player.velocityY> -3  ){
   compPlay.velocityY = -3;
 }
 else{
   compPlay.velocityY = 3;
 }

 if(player.x>650){
   player.x = 1;
 }

 if(compPlay.x>650){
   compPlay.x = 1;
 }

 if(player.y>650){
   player.y = 1;
 }
 
 if(player.y<1){
  player.y = 650;
}

if(compPlay.y>650){
  compPlay.y = 1;
}

if(compPlay.y<1){
  compPlay.y = 650;
}

if(mouseIsPressed){
  createLazer();
  createCompLazer();
}

if(asteroid.isTouching(playerLazer)){
  asteroid.destroy();
  score = score+1;
  
}


if(player.isTouching(playerLazer)){
  score = score-1;
}

if(playerLazer.isTouching(compPlay)){
  compPlay.x = 1;
  compPlay.y = 320;
}

if(player.isTouching(compPlay)){
  player.x =1;
  compPlay.x = 1;
}

if(compLazer.isTouching(player)){
  score = score - 1;
}

if(score>= 10){
  player.velocityX = 0;
  player.velocityY = 0;

  text("YOU WIN!!!!",320,320);
}

if(score< -8){
  text("YOU LOSE!!!!",320,320);
}

spawnAsteroids();

  drawSprites();
}

function spawnAsteroids(){
  if(frameCount % 25 === 0){
    var y;
    y = random(1, 650);
    asteroid = createSprite(650,y,20,20);
  asteroid.addImage(asteroidImg);
    asteroid.velocityX = 1+score*-2;
   
    if(player.isTouching(asteroid) && score>1){
      score = score-0.2;
    } 

    asteroid.scale = 1.3;
    
    
   
  }
}

function createLazer(){
  playerLazer = createSprite(player.x, player.y,10,10);
  playerLazer.addImage(playLazer);
  playerLazer.x = mouseX;
  playerLazer.y = mouseY;
  playerLazer.lifetime = 300;
  
}

function createCompLazer(){
  var x,y;
  x = random(1,649);
  y = random(1,649);
 compLazer = createSprite(x,y,10,10);
  compLazer.addImage(comLazer);
  compLazer.lifetime = 300;
  
}