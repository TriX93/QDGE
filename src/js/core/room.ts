import Layer from "./layer";
import Object from "./object";

export default class Room {
  constructor() {}

  viewport: HTMLCanvasElement;
  viewportContext: CanvasRenderingContext2D;

  roomW?: number = Infinity;
  roomH?: number = Infinity;

  layers: any[] = [];

  public setViewport(viewport: HTMLCanvasElement) {
    this.viewport = viewport;
  }
  public setViewportContext(viewportC: CanvasRenderingContext2D) {
    this.viewportContext = viewportC;
  }

  public addLayer(layer: Layer) {
    this.layers.push(layer);
  }

  init() {
    this.layers.forEach((layer) => layer.init());
  }

  step(ts: number) {
    this.layers.forEach((layer) => layer.step(ts));
  }

  draw() {
    const vh = this.viewport.getAttribute("height");
    const vw = this.viewport.getAttribute("width");
    this.viewportContext.fillStyle = "#000000";
    this.viewportContext.fillRect(0, 0, parseInt(vw), parseInt(vh));
    this.layers
      .sort((a, b) => {
        return a.getDepth() - b.getDepth();
      })
      .forEach((layer) => layer.draw(this.viewportContext));
  }

  getAllObjects(className?: string) {
    const objs: Object[] = this.layers.map((l) => l.getInstances()).flat();

    if (!!className) {
      return objs.filter((i) => i.className == className);
    }

    return objs;
  }
}
