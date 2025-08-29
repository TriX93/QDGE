import Camera from "./camera";
import SpriteLoader from "./sprite_loader";
import Rect from "./types/Rect";
import Vector2 from "./types/Vector2";

export default class Sprite {
  constructor() {}

  bbox?: Rect;
  anchor?: Vector2;
  image: HTMLImageElement;
  imageURL: string;
  imageLoaded: boolean = false;
  frameCount: number = 1;
  fps: number = 60;
  animate: boolean = false;
  tileH: number;
  tileW: number;
  marginTop: number = 0;
  marginLeft: number = 0;
  gutterLeft: number = 0;
  rotateOnDraw: boolean = false;

  _camera: Camera = Camera.getInstance();

  _frame: number = 0;
  _mspf: number = 1000 / this.fps;

  setBbox(bbox: Rect) {
    this.bbox = bbox;
  }
  setAnchor(anchor: Vector2) {
    this.anchor = anchor;
  }
  setImageURL(url: string) {
    this.imageURL = url;
  }
  setTileH(tileH: number) {
    this.tileH = tileH;
  }
  setTileW(tileW: number) {
    this.tileW = tileW;
  }
  setFps(fps: number) {
    this.fps = fps;
  }
  setFrameCount(fc: number) {
    this.frameCount = fc;
  }

  init() {
    const spriteLoader = SpriteLoader.getInstance();
    spriteLoader.load(this.imageURL).then((image) => {
      this.image = image;
      this.imageLoaded = true;
      const w: number = !!this.tileW ? this.tileW : this.image.width;
      const h: number = !!this.tileH ? this.tileH : this.image.height;
      if (!this.bbox) {
        this.bbox = {
          x1: 0,
          y1: 0,
          x2: w,
          y2: h,
        };
      }
      if (!this.anchor) {
        this.anchor = { x: Math.floor(w / 2), y: Math.floor(h / 2) };
      }
    });
    this._mspf = 1000 / this.fps;
  }

  step(ts: number) {
    this._frame = Math.floor(ts / this._mspf) % this.frameCount;
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number, angle: number = 0, drawCollisions: boolean = false, drawRay: boolean = false) {
    if (this.imageLoaded) {
      const actualX = x - this.anchor.x - this._camera.originX;
      const actualY = y - this.anchor.y - this._camera.originY;
      if (!!this.tileH && !!this.tileW) {
        this._frame = this._frame % this.frameCount;
        const sx =
          this.marginLeft + this._frame * (this.tileW + this.gutterLeft);
        const sy = this.marginTop;
        // rotate only the sprite image if angle is not zero
        if (angle !== 0 && this.rotateOnDraw) {
          ctx.save();
          ctx.translate(actualX + this.anchor.x, actualY + this.anchor.y);
          ctx.rotate(angle);
          ctx.drawImage(
            this.image,
            sx,
            sy,
            this.tileW,
            this.tileH,
            -this.anchor.x,
            -this.anchor.y,
            this.tileW,
            this.tileH
          );
          ctx.restore();
        } else {
          ctx.drawImage(
            this.image,
            sx,
            sy,
            this.tileW,
            this.tileH,
            actualX,
            actualY,
            this.tileW,
            this.tileH
          );
        }
      } else {
        if (angle !== 0 && this.rotateOnDraw) {
          ctx.save();
          ctx.translate(actualX + this.anchor.x, actualY + this.anchor.y);    
          ctx.rotate(angle);
          ctx.drawImage(this.image, -this.anchor.x, -this.anchor.y);
          ctx.restore();
        } else  {
          ctx.drawImage(this.image, actualX, actualY);
        }
      }
      if (drawCollisions)
        this.drawCollisions(ctx, x, y);

      if (drawRay) {
        ctx.strokeStyle = "#00FF00";
        ctx.beginPath();
        ctx.moveTo(actualX + this.anchor.x, actualY + this.anchor.y);
        const rayLength = 200;
        const rayX = actualX + this.anchor.x + Math.cos(angle) * rayLength;
        const rayY = actualY + this.anchor.y + Math.sin(angle) * rayLength;
        ctx.lineTo(rayX, rayY);
        ctx.stroke();
        ctx.strokeStyle = "#0000FF";
      } 
    }
  }

  isPointColliding(objX: number, objY: number, checkX: number, checkY: number) {
    // Normalize coordinates
    const myX = objX - this.anchor.x;
    const myY = objY - this.anchor.y;

    // Localize bbox
    const x1 = myX + this.bbox.x1;
    const y1 = myY + this.bbox.y1;
    const x2 = myX + this.bbox.x2;
    const y2 = myY + this.bbox.y2;

    return checkX >= x1 && checkX <= x2 && checkY >= y1 && checkY <= y2;
  }

  drawCollisions(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const myX = x - this.anchor.x;
    const myY = y - this.anchor.y;

    // Localize bbox
    const x1 = myX + this.bbox.x1;
    const y1 = myY + this.bbox.y1;
    const w = this.bbox.x2 - this.bbox.x1;
    const h = this.bbox.y2 - this.bbox.y1;

    ctx.strokeStyle = "#FF0000";
    ctx.strokeRect(x1, y1, w, h);
    ctx.strokeStyle = "#0000FF";
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillRect(x - 2, y, 4, 1);
    ctx.fillRect(x, y - 2, 1, 4);
  }

  isRectColliding(
    objX: number,
    objY: number,
    checkX1: number,
    checkY1: number,
    checkX2: number,
    checkY2: number
  ) {
    // Normalize coordinates
    const myX = objX - this.anchor.x;
    const myY = objY - this.anchor.y;

    // Localize bbox
    const x1 = myX + this.bbox.x1;
    const y1 = myY + this.bbox.y1;
    const x2 = myX + this.bbox.x2;
    const y2 = myY + this.bbox.y2;

    // If one is on the left of the other they don't collide
    if (x1 > checkX2 || checkX1 > x2) return false;

    // If one is below the other they don't collide
    if (y1 > checkY2 || checkY1 > y2) return false;

    return true;
  }
}
