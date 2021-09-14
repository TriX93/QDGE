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

  public static getInstance() {
    if (!this._instance) {
      this._instance = new CollisionsManager();
    }
    return this._instance;
  }
}
