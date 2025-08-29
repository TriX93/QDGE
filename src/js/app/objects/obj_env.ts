import Object from "../../core/object";
export default class ObjEnv extends Object {
  classList = ["obj_env"];

  constructor(x: number, y: number) {
    super();
    this.setX(x);
    this.setY(y);
  }

  step(ts: number) {
    this.setDepth(-this.getY());
    super.step(ts);
  }
}
