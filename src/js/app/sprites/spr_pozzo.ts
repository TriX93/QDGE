import Sprite from "../../core/sprite";

export default class SprPozzo extends Sprite {
  constructor() {
    super();
  }
  init() {
    this.setImageURL("assets/images/pozzo.png");
    this.setAnchor({ x: 47, y: 77 });
    this.setBbox({ x1: 0, y1: 50, x2: 91, y2: 108 });
    this.setFrameCount(1);
    super.init();
  }
}
