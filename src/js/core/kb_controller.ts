export default class KeyboardController {
  private static _instance: KeyboardController;

  constructor() {}

  _keys: any[] = new Array();

  keyDown(k: any) {
    if (this._keys.indexOf(k) < 0) this._keys.push(k);
  }

  keyUp(k: any) {
    const index = this._keys.indexOf(k);
    if (index > -1) {
      this._keys.splice(index, 1);
    }
  }

  checkKeys(k: any) {
    return this._keys.indexOf(k) > -1;
  }

  public static getInstance() {
    if (!this._instance) {
      this._instance = new KeyboardController();
    }
    return this._instance;
  }
}
