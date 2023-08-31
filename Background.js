class Background extends Array{

  constructor(player, backgroundImage) {
    super();

    this.player = player;
    this.backgroundImage = backgroundImage;
    this.maxSize = Infinity;
    this.distanceSpawnRange = [0, 1];
    this.ySpawnRange = [0, 0];
    this.widthSpawnRange = [1, 1];
    this.heightSpawnRange = [1, 1];
    this.relativeSpeedRatio = 0.6;

    this.updateSpeed();
  }

  update() {
    this.updateSpeed();

    for (const backgroundImage of this) {
      backgroundImage.move(createVector(this.speed, 0));
    }

    this.clean();
  }

  display() {
    for (const backgroundImage of this) {
      backgroundImage.display();
    }
  }

  shouldSpawn() {
    if (this.length >= this.maxSize) return false;
    if (this.length == 0) return true;

    const lastImage = this[this.length - 1];

    return lastImage.pos.x < width;
  }

  spawn(spawnOutside=true, randomFunction=random){
    let newImage;

    if (this.length == 0) {
      newImage = new BackgroundImage(
        createVector(0, random(...this.heightSpawnRange)),
        this.backgroundImage,
        random(...this.widthSpawnRange),
        random(...this.heightSpawnRange)
      );
    } else {
      const lastImage = this[this.length - 1];
      const distance = randomFunction(...this.distanceSpawnRange);

      //outside parameter tells if it has to spawn outside of the screen or if it is just populating the screen
      const x = spawnOutside ? max(width, lastImage.pos.x + lastImage.pxWidth + distance) : lastImage.pos.x + lastImage.pxWidth + distance;
      newImage = new BackgroundImage(
        createVector(x, random(...this.ySpawnRange)),
        this.backgroundImage,
        random(...this.widthSpawnRange),
        random(...this.heightSpawnRange)
      );
    }
    this.push(newImage);

  }

  clean() {
    if (this.length == 0) return;

    let first = this[0];

    while (first.pos.x + first.pxWidth < 0) {
      this.shift();
      if (this.length == 0) return;

      first = this[0];
    }
  }

  updateSpeed(){
    this.speed = (this.player.speed.x-this.player.relativeSpeed)*this.relativeSpeedRatio;
  }
}
