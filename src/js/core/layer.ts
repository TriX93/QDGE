export default class Layer {
  constructor() {}

  depth: number = 0;
  latsInstanceId = -1;
  instances: any[] = [];

  public setDepth(depth: number) {
    this.depth = depth;
  }
  public getDepth(): number {
    return this.depth;
  }

  init() {}

  public addInstance(object: any) {
    object.setInstanceId(this.latsInstanceId++);
    this.instances.push(object);
    object.init();
  }

  step(ts: number) {
    this.instances.forEach((inst) => inst.step(ts));
  }

  draw(context: CanvasRenderingContext2D) {
    const instancesToDraw = this.getInstancesToDraw();
    instancesToDraw.forEach((inst) => {
      inst.draw(context);
    });
  }

  getInstancesToDraw() {
    return this.instances
      .filter((inst) => inst.getVisible()) // find all visible instances
      .sort((a, b) => {
        return b.getDepth() - a.getDepth();
      }); // Depth sorting
  }

  getInstances() {
    return this.instances;
  }
}
