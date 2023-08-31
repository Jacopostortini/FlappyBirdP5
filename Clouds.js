class Clouds extends Background{

  constructor(player, backgroundImage){
    super(player, backgroundImage);

    this.maxSize = 8;
    this.distanceSpawnRange = [0, 100];
    this.ySpawnRange = [10, height/2];
    this.widthSpawnRange = [70, 100];
    this.heightSpawnRange = [0, 0];

    while (this.shouldSpawn()) {
      this.spawn(false);
    }
  }

  update(){
    super.update();
    while (this.shouldSpawn()) this.spawn(true);
  }

  spawn(spawnOutside=true){
    super.spawn(spawnOutside, random);
    this[this.length-1].pxHeight = this[this.length-1].pxWidth;
  }
}
