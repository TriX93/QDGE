import Camera from "../../core/camera";
import CollisionsManager from "../../core/collisions_manager";
import KeyboardController from "../../core/kb_controller";
import Object from "../../core/object";
import Sprite from "../../core/sprite";
import SprHeroIdleDown from "../sprites/spr_hero_idle_down";
import SprHeroIdleLeft from "../sprites/spr_hero_idle_left";
import SprHeroIdleRight from "../sprites/spr_hero_idle_right";
import SprHeroIdleUp from "../sprites/spr_hero_idle_up";
import SprHeroRunDown from "../sprites/spr_hero_run_down";
import SprHeroRunLeft from "../sprites/spr_hero_run_left";
import SprHeroRunRight from "../sprites/spr_hero_run_right";
import SprHeroRunUp from "../sprites/spr_hero_run_up";

export default class ObjPlayer extends Object {
  constructor() {
    super();
  }

  kb: KeyboardController = KeyboardController.getInstance();
  cm: CollisionsManager = CollisionsManager.getInstance();

  _speed: number = 8;
  _dir = 0;

  _idleSprs: Sprite[] = [
    new SprHeroIdleRight(),
    new SprHeroIdleDown(),
    new SprHeroIdleLeft(),
    new SprHeroIdleUp(),
  ];
  _runSprs: Sprite[] = [
    new SprHeroRunRight(),
    new SprHeroRunDown(),
    new SprHeroRunLeft(),
    new SprHeroRunUp(),
  ];

  _camera: Camera = Camera.getInstance();

  init() {
    this.sprite = this._idleSprs[0];

    this._idleSprs.forEach((s) => s.init());
    this._runSprs.forEach((s) => s.init());

    this._camera._target = this;

    super.init();
  }

  step(ts: number) {
    const leftSpeed = this.kb.checkKeys("KeyA") ? 1 : 0;
    const rightSpeed = this.kb.checkKeys("KeyD") ? 1 : 0;
    const upSpeed = this.kb.checkKeys("KeyW") ? 1 : 0;
    const downSpeed = this.kb.checkKeys("KeyS") ? 1 : 0;

    const vspeed = (downSpeed - upSpeed) * this._speed;
    const hspeed = (rightSpeed - leftSpeed) * this._speed;

    if (vspeed != 0 || hspeed != 0) {
      if (vspeed > 0) {
        this._dir = 1;
      }
      if (vspeed < 0) {
        this._dir = 3;
      }
      if (hspeed > 0) {
        this._dir = 0;
      }
      if (hspeed < 0) {
        this._dir = 2;
      }

      this.sprite = this._runSprs[this._dir];
    } else {
      this.sprite = this._idleSprs[this._dir];
    }

    const newx = this.getX() + hspeed;
    const newy = this.getY() + vspeed;

    if (!this.cm.isPointColliding(newx, newy, "obj_env")) {
      this.setX(newx);
      this.setY(newy);
    }

    this.setDepth(-this.getY());
    super.step(ts);
  }
}
