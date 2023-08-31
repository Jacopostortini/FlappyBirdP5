class BackgroundImage {

  constructor(pos, image, pxWidth, pxHeight) {
    this.pos = pos;
    this.image = image;

    this.pxWidth = pxWidth;
    this.pxHeight = pxHeight;
  }

  move(delta) {
    this.pos.add(delta);
  }

  display() {
    image(this.image, this.pos.x, this.pos.y, this.pxWidth, this.pxHeight);
  }
}
