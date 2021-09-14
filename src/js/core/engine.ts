import Camera from "./camera";
import KeyboardController from "./kb_controller";
import Room from "./room";

export default class Engine {
  vh: number;
  vw: number;
  room: any;

  fps: number = 60;

  camera: Camera = Camera.getInstance();

  private _previousTS: number = 0;

  viewport: HTMLCanvasElement;

  constructor() {}

  public setVh(vh: number) {
    this.vh = vh;
  }
  public setVw(vw: number) {
    this.vw = vw;
  }
  public setRoom(room: Room) {
    this.room = room;

    this.camera.roomH =
      !!this.room && !!this.room.roomH ? this.room.roomH : this.vh;
    this.camera.roomW =
      !!this.room && !!this.room.roomW ? this.room.roomW : this.vw;
  }

  kb: KeyboardController = KeyboardController.getInstance();

  init() {}

  run(app: HTMLElement) {
    this.viewport = document.createElement("canvas");
    this.viewport.setAttribute("height", this.vh.toString());
    this.viewport.setAttribute("width", this.vw.toString());
    const ctx = this.viewport.getContext("2d");

    this.camera.vh = this.vh;
    this.camera.vw = this.vw;

    this.camera.roomH =
      !!this.room && !!this.room.roomH ? this.room.roomH : this.vh;
    this.camera.roomW =
      !!this.room && !!this.room.roomW ? this.room.roomW : this.vw;

    this.room.setViewport(this.viewport);
    this.room.setViewportContext(ctx);

    const assetsBay = document.createElement("div");
    assetsBay.setAttribute("id", "assetsBay");
    app.append(this.viewport, assetsBay);

    document.onkeydown = (e: KeyboardEvent) => {
      this.kb.keyDown(e.code);
    };

    document.onkeyup = (e: KeyboardEvent) => {
      this.kb.keyUp(e.code);
    };

    this.startRenderPipeline();

    this.room.init();

    return this.viewport;
  }

  startRenderPipeline() {
    requestAnimationFrame((ts) => {
      this.renderPipeline(ts);
    });
  }

  renderPipeline(ts: number) {
    if (!!this.room) {
      this.room.step(ts);
      this.camera.step(ts);
      this.room.draw();
    }
    this.startRenderPipeline();
  }
}

/**
 * TODO:
 * view management
 * sprite animation
 * tileset
 * keyboard management
 * mouse management
 *
 * BUGS:
 * better sprite loader
 */
