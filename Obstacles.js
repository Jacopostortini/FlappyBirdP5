class Obstacles extends Array {

  constructor(player, upperPipeEndImage, lowerPipeEndImage, pipeBodyImage) {
    super();
    //State variables
    this.player = player;
    this.speed = this.player.speed.x - this.player.relativeSpeed;

    //Gameplay constants
    this.distanceBetweenObstacles = 200;
    this.startingPoint = width/2;

    //Display constants
    this.upperPipeEndImage = upperPipeEndImage;
    this.lowerPipeEndImage = lowerPipeEndImage;
    this.pipeBodyImage = pipeBodyImage;
  }

  display() {
    for (const obstacle of this) {
      obstacle.display();
    }
  }

  update() {
    this.speed = this.player.speed.x - this.player.relativeSpeed;

    for (const obstacle of this) {
      obstacle.update(this.speed);
      if(obstacle.checkCollision(this.player)) this.player.die();
    }

    while (this.shouldSpawn()) this.spawn();
    this.clean();
  }

  shouldSpawn() {
    if (this.length == 0) return true;

    const lastObstacle = this[this.length - 1];
    return lastObstacle.x + lastObstacle.pxWidth < width;
  }

  spawn() {
    let newObstacle;

    if (this.length == 0) newObstacle = new Obstacle(this.startingPoint, this.upperPipeEndImage, this.lowerPipeEndImage, this.pipeBodyImage);
    else {
      const lastObstacle = this[this.length - 1];
      newObstacle = new Obstacle(lastObstacle.x + lastObstacle.pxWidth + this.distanceBetweenObstacles, this.upperPipeEndImage, this.lowerPipeEndImage, this.pipeBodyImage);
    }

    this.push(newObstacle);
  }

  clean() {
    if (this.length == 0) return;

    let first = this[0];
    while (first.x + first.pxWidth < 0) {
      this.shift();
      if (this.length == 0) break;

      first = this[0];
    }
  }
}
