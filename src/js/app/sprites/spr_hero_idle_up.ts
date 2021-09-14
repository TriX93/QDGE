import Sprite from "../../core/sprite";

export default class SprHeroIdleUp extends Sprite {
  constructor() {
    super();
  }
  init() {
    this.setImageURL("assets/images/hero_sprite_idle_up.png");
    this.setTileW(50);
    this.setTileH(47);
    this.setAnchor({ x: 20, y: 35 });
    this.setFrameCount(2);
    this.setFps(7);
    super.init();
  }
}