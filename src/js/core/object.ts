import Sprite from "./sprite";

export default class Object {
  constructor() {}

  depth: number = 0;
  visible: boolean = true;
  x: number = 0;
  y: number = 0;
  sprite: Sprite;
  _drawBorders: boolean = false;
  angle: number = 0;

  classList: string[] = [];

  instanceId: number;

  setDepth(depth: number) {
    this.depth = depth;
  }
  setVisible(visible: boolean) {
    this.visible = visible;
  }
  setX(x: number) {
    this.x = x;
  }
  setY(y: number) {
    this.y = y;
  }
  setInstanceId(id: number) {
    this.instanceId = id;
  }

  getDepth(): number {
    return this.depth;
  }
  getVisible(): boolean {
    return this.visible;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }

  setDbgDrawBorders(drawBorders: boolean) {
    this._drawBorders = drawBorders;
  }

  isPointColliding(x: number, y: number) {
    return this.sprite.isPointColliding(this.x, this.y, x, y);
  }

  isRectColliding(x1: number, y1: number, x2: number, y2: number) {
    return this.sprite.isRectColliding(this.x, this.y, x1, y1, x2, y2);
  }

  isLookingAt(obj: Object, fov: number = Math.PI / 4, maxDistance: number = 100): boolean {
    const dx = obj.getX() - this.getX();
    const dy = obj.getY() - this.getY();
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > maxDistance) return false; 
    const angleToObj = Math.atan2(dy, dx);
    let angleDiff = angleToObj - this.angle;
    angleDiff = (angleDiff + Math.PI * 2) % (Math.PI * 2); 
    if (angleDiff > Math.PI) angleDiff -= Math.PI * 2; 
    return Math.abs(angleDiff) <= fov / 2;
  }

  init() {
    if (!!this.sprite)
      this.sprite.init();
  }
  step(ts: number) {
    if (!!this.sprite)
        this.sprite.step(ts);
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (!!this.sprite && this.visible)
      this.sprite.draw(ctx, this.x, this.y, this.angle);
  }
}
