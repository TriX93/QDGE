import SprPozzo from "../sprites/spr_pozzo";
import ObjEnv from "./obj_env";

export default class ObjHiddenWall extends ObjEnv {
  classList = ["obj_env"];

  constructor(x: number, y: number, private w: number, private h: number) {
    super(x, y);
  }

  init() {
    //this.sprite = new SprPozzo();
    super.init();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    // Do nothing, invisible wall
  }

  isPointColliding(x: number, y: number): boolean {
    return x >= this.x && x <= this.x + this.w && y >= this.y && y <= this.y + this.h;
  }

  isRectColliding(x1: number, y1: number, x2: number, y2: number): boolean {
    return !(x2 < this.x || x1 > this.x + this.w || y2 < this.y || y1 > this.y + this.h);
  } 
}
