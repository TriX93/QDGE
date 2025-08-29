import Engine from "../core/engine";
import RmMain from "./rooms/rm_main";

export default class Game extends Engine {
  constructor() {
    super();
  }

  debug = true;

  mainRoom: RmMain = new RmMain();

  init() {
    this.setVh(600);
    this.setVw(800);
    this.setRoom(this.mainRoom);

    super.init();
  }
}
