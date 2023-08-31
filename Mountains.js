class Mountains extends Background{

  constructor(player, backgroundImage){
    super(player, backgroundImage);

    this.maxSize = Infinity;
    this.distanceSpawnRange = [-200, 200];
    this.ySpawnRange = [height, height];
    this.widthSpawnRange = [300, 400];
    this.heightSpawnRange = [150, 200];

    while (this.shouldSpawn()) {
      this.spawn(false);
    }
  }

  update(){
    super.update();
    while (this.shouldSpawn()) this.spawn(true);
  }

  spawn(spawnOutside=true){
    super.spawn(spawnOutside, Utils.inverseRandomGaussian);
    this[this.length-1].pos.y = height - this[this.length-1].pxHeight;
  }
}
