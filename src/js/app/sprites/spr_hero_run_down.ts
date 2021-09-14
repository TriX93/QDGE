import Sprite from "../../core/sprite";

export default class SprHeroRunDown extends Sprite {
  constructor() {
    super();
  }
  init() {
    this.setImageURL("assets/images/hero_sprite_run_down.png");
    this.setTileW(50);
    this.setTileH(47);
    this.setAnchor({ x: 20, y: 35 });
    this.setFrameCount(4);
    this.setFps(7);
    super.init();
  }
}
