class Player{

  constructor(image){
    //Physics constants
    this.jumpForce = -8;
    this.gravity = createVector(0, 0.5);
    this.xPosLimit = width/3;
    this.relativeSpeed = 3;

    //Display constants
    this.scaleFactor = 2;
    this.pxWidth = 17*this.scaleFactor;
    this.pxHeight = 12*this.scaleFactor;
    this.image = image;


    //State variables
    this.pos = createVector(width/10, height/2);
    this.speed = createVector(this.relativeSpeed, 0);
    this.isAlive = true;
  }

  //Runs every frame, updates position and speed.
  //Also making check about relative speed of the bird and it's height to make sure it's not going out of the screen
  update(){
    this.pos.add(this.speed);
    this.speed.add(this.gravity);

    if(this.pos.x > this.xPosLimit){
      this.pos.x = this.xPosLimit;
      this.speed.x = 0;
    }

    this.pos.y = max(0, min(height, this.pos.y+this.pxHeight)-this.pxHeight);
  }

  //makes the bird jump (instant velocity change)
  jump(){
    if(this.isAlive)
    this.speed.y = this.jumpForce;
  }

  //runs every frame, just draws the player
  display(){
    image(this.image, this.pos.x, this.pos.y, this.pxWidth, this.pxHeight);
  }

  //stops the player and disable controls
  die(){
    this.speed.x = 0;
    this.relativeSpeed = 0;

    this.isAlive = false;
  }
}
