import Tileset from "../../core/tileset";

export default class TsGround extends Tileset {
  imageURL = "assets/images/tileset.png";
  tileH = 48;
  tileW = 48;
  cols = 12;
  rows = 14;

  constructor() {
    super();
  }
}
