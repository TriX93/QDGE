import SpriteLoader from "./sprite_loader";

export default class Tileset {
  constructor() {}

  tileH: number;
  tileW: number;
  marginTop: number = 0;
  marginLeft: number = 0;
  gutterLeft: number = 0;
  gutterTop: number = 0;

  cols: number = 1;
  rows: number = 1;

  imageURL: string;
  image: HTMLImageElement;
  imageLoaded: boolean = false;

  init() {
    const spriteLoader = SpriteLoader.getInstance();
    spriteLoader.load(this.imageURL).then((image) => {
      this.image = image;
      this.imageLoaded = true;
      const w: number = !!this.tileW ? this.tileW : this.image.width;
      const h: number = !!this.tileH ? this.tileH : this.image.height;
    });
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number, index: number) {
    if (this.imageLoaded) {
      const col = index % this.cols;
      const row = Math.floor(index / this.cols);

      const sx = this.marginLeft + col * (this.tileW + this.gutterLeft);
      const sy = this.marginTop + row * (this.tileW + this.gutterLeft);
      ctx.drawImage(
        this.image,
        sx,
        sy,
        this.tileW,
        this.tileH,
        x,
        y,
        this.tileW,
        this.tileH
      );
      //this.drawCollisions(ctx, x, y);
    }
  }
}
