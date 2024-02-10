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

  _speed: number = 4;
  _dir = 0;
  _direction = 0; // direction in radians
  _vspeed = 0;
  _hspeed = 0;

  _canInteract:boolean = true;

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

    this._vspeed = (downSpeed - upSpeed) * this._speed;
    this._hspeed = (rightSpeed - leftSpeed) * this._speed;

    if (this._vspeed != 0 || this._hspeed != 0) {
      if (this._vspeed > 0) {
        this._dir = 1;
      }
      if (this._vspeed < 0) {
        this._dir = 3;
      }
      if (this._hspeed > 0) {
        this._dir = 0;
      }
      if (this._hspeed < 0) {
        this._dir = 2;
      }

      this.sprite = this._runSprs[this._dir];
      this._direction = Math.atan2(this._vspeed, this._hspeed);
      console.log(this._dir, this._direction);

    } else {
      this.sprite = this._idleSprs[this._dir];
    }

    const newx = this.getX() + this._hspeed;
    const newy = this.getY() + this._vspeed;

    if (!this.cm.isPointColliding(newx, newy, "obj_env")) {
      this.setX(newx);
      this.setY(newy);
    }

    this.setDepth(-this.getY());
    super.step(ts);

    const objectInSight = this.cm.castRay(this.getX(), this.getY(), this._direction, this._speed * 30, "obj_env");
    
  
  }

}
