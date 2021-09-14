import CollisionsManager from "../../core/collisions_manager";
import Layer from "../../core/layer";
import Room from "../../core/room";
import TiledLayer from "../../core/tiled_layer";
import ObjPlayer from "../objects/obj_player";
import ObjPozzo from "../objects/obj_pozzo";
import TsGround from "../tilesets/ts_ground";

export default class RmMain extends Room {
  constructor() {
    super();
  }

  cm: CollisionsManager = CollisionsManager.getInstance();
  player: ObjPlayer = new ObjPlayer();

  init() {
    this.cm.setRoom(this);
    this.addLayer(this._instances());
    this.addLayer(this._background());
    super.init();
  }

  _background(): TiledLayer {
    const tl = new TiledLayer();
    tl.vw = 800;
    tl.vh = 600;
    tl.tileset = new TsGround();
    tl.tileMap =
      "ABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGHABGH";

    return tl;
  }

  _instances(): Layer {
    const layer = new Layer();
    this.player.setX(100);
    this.player.setY(100);
    layer.addInstance(this.player);

    layer.addInstance(new ObjPozzo(150, 200));

    layer.setDepth(10);

    return layer;
  }
}
