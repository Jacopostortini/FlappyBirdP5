const paths = {
  player: "assets/player.png",
  upperPipeEnd: "assets/upperPipeEnd.png",
  lowerPipeEnd: "assets/lowerPipeEnd.png",
  pipeBody: "assets/pipeBody.png",
  mountain: "assets/mountain.png",
  cloud: "assets/cloud.png"
};
const images = {};

const backgroundColor = {r: 0, g: 250, b: 255};
let player;
let obstacles;

let mountains;
let clouds;

let score = 0;

function setup(){
  createCanvas(800, 650);
  loadImages();

  player = new Player(images.player);
  obstacles = new Obstacles(player, images.upperPipeEnd, images.lowerPipeEnd, images.pipeBody);
  mountains = new Mountains(player, images.mountain);
  clouds = new Clouds(player, images.cloud);

}

function draw(){
  background(backgroundColor.r, backgroundColor.g, backgroundColor.b);

  player.update();
  obstacles.update();
  mountains.update();
  clouds.update();

  clouds.display();
  mountains.display();
  obstacles.display();
  player.display();

  if(!player.isAlive){
    if(player.pos.y == height - player.pxHeight){
      reset();
    }
  }

  if(player.isAlive){
    score += 0.1;
  }

  textSize(20);
  text("Score: "+floor(score), 20, 25);
}

function keyPressed(){
  if(key == " "){
    player.jump();
  }
}


function loadImages() {
  for(const path in paths){
    images[path] = loadImage(paths[path]);
  }
}

function reset(){
  player = new Player(images.player);
  obstacles = new Obstacles(player, images.upperPipeEnd, images.lowerPipeEnd, images.pipeBody);
  clouds.player = player;
  mountains.player = player;
  score = 0;
}
