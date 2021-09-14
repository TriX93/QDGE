import SprPozzo from "../sprites/spr_pozzo";
import ObjEnv from "./obj_env";

export default class ObjPozzo extends ObjEnv {
  className = "obj_env";

  constructor(x: number, y: number) {
    super(x, y);
  }

  init() {
    this.sprite = new SprPozzo();
    super.init();
  }
}
