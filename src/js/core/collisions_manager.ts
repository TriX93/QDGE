import Object from "./object";
import Room from "./room";

export default class CollisionsManager {
  private static _instance: CollisionsManager;

  constructor() {}

  _room: Room;

  setRoom(room: Room) {
    this._room = room;
  }

  isPointColliding(
    checkX: number,
    checkY: number,
    className: string = "*"
  ): Object {
    if (!this._room) {
      return null;
    }

    const objs: Object[] =
      className != "*"
        ? this._room.getAllObjects(className)
        : this._room.getAllObjects();

    for (let i = 0; i < objs.length; i++) {
      const obj: Object = objs[i];
      if (obj.isPointColliding(checkX, checkY)) return obj;
    }
  }

  castRay(x1: number, y1: number, angle: number, distance: number, className:string="*", step: number = 0.1): ({ obj: Object, distance: number }| null) {
    let i = 0, d2 = 0, a = 0, b = 0;
    do {
      const x2 = x1+a;
      const y2 = y1+b;

      const obj = this.isPointColliding(x2, y2, className);
      if (obj) {
        return { obj, distance: d2 };
      }

      i = i + step;
      a = Math.cos(angle)*i;
      b = Math.sin(angle)*i;
      d2 = Math.sqrt(a*a + b*b);
    } while (distance >= d2)

    return null;
  }

  public static getInstance() {
    if (!this._instance) {
      this._instance = new CollisionsManager();
    }
    return this._instance;
  }
}
