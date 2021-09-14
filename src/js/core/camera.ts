import Object from "./object";

export default class Camera {
  private static _instance: Camera;
  constructor() {}

  _target: Object;
  vw: number = 0;
  vh: number = 0;

  roomH: number = 0;
  roomW: number = 0;

  originX: number = 0;
  originY: number = 0;

  maxX: number = this.originX + this.vw;
  maxY: number = this.originX + this.vh;

  public static getInstance() {
    if (!this._instance) {
      this._instance = new Camera();
    }
    return this._instance;
  }

  init() {}
  step(ts: number) {
    if (!!this._target) {
      let newOriginX = this._target.x - Math.floor(this.vw / 2);
      let newOriginY = this._target.y - Math.floor(this.vh / 2);

      if (newOriginX < 0) {
        newOriginX = 0;
      }
      if (newOriginY < 0) {
        newOriginY = 0;
      }
      if (newOriginX + this.vw > this.roomW) {
        newOriginX = this.roomW - this.vw;
      }
      if (newOriginY + this.vh > this.roomH) {
        newOriginY = this.roomH - this.vh;
      }

      this.originX = newOriginX;
      this.originY = newOriginY;
    }

    this.maxX = this.originX + this.vw;
    this.maxY = this.originX + this.vh;
  }
  draw() {}
}
