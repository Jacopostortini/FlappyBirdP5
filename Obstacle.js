class Obstacle {

  constructor(x, upperPipeEndImage, lowerPipeEndImage, pipeBodyImage){
    const gap = random(100, 200);

    //State variables
    this.x = x;
    this.yTop = random(100, height*2/3);;
    this.yBottom = this.yTop + gap;
    this.pxWidth = 50;

    //Display constants
    this.endHeight = this.pxWidth;
    this.upperPipeEndImage = upperPipeEndImage;
    this.lowerPipeEndImage = lowerPipeEndImage;
    this.pipeBodyImage = pipeBodyImage;
  }

  update(deltaX){
    this.x += deltaX;
  }

  display(){
    //Upper body
    image(this.pipeBodyImage, this.x, 0, this.pxWidth, this.yTop-this.endHeight);
    //Upper end
    image(this.upperPipeEndImage, this.x, this.yTop-this.endHeight, this.pxWidth, this.endHeight);

    //Lower body
    image(this.pipeBodyImage, this.x, this.yBottom+this.endHeight, this.pxWidth, height-this.yBottom-this.endHeight);
    //Lower end
    image(this.lowerPipeEndImage, this.x, this.yBottom, this.pxWidth, this.endHeight);
  }

  checkCollision(player){
    if(this.x < player.pos.x+player.pxWidth && player.pos.x < this.x+this.pxWidth) {
      //Right x position
      if(player.pos.y < this.yTop || this.yBottom < player.pos.y+player.pxHeight){
        //Right y position
        return true;
      }
    }
    return false;
  }

}
