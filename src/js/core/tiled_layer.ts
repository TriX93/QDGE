import Camera from "./camera";
import Layer from "./layer";
import Tileset from "./tileset";

export default class TiledLayer extends Layer {
  tileset: Tileset;
  vw: number;
  vh: number;
  tileMap: string;

  camera: Camera = Camera.getInstance();

  init() {
    this.tileset && this.tileset.init();

    super.init();
  }

  step() {}

  draw(ctx: CanvasRenderingContext2D) {
    const cols = Math.ceil(this.vw / this.tileset.tileW);
    const rows = Math.ceil(this.vh / this.tileset.tileH);

    for (let i = 0; i < (this.tileMap || "").length; i++) {
      const x = (i % cols) * this.tileset.tileW - this.camera.originX;
      const y = Math.floor(i / cols) * this.tileset.tileH - this.camera.originY;
      this.tileset.draw(ctx, x, y, this.tileMap.charCodeAt(i) - 65);
      //this.writeTileName(ctx, x, y, this.tileMap[i]);
    }
  }

  writeTileName(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    index: string
  ) {
    ctx.strokeStyle = "#ff0000";
    ctx.fillStyle = "#ff0000";
    ctx.strokeRect(x, y, this.tileset.tileW, this.tileset.tileH);
    ctx.font = "10px Arial";
    ctx.fillText(index, x + 2, y + 12);
  }

  constructor() {
    super();
  }
}
