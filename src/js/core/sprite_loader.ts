import { resolve } from "../../../config/webpack.common";

export default class SpriteLoader {
  private static instance: SpriteLoader;

  private imageMap: Map<string, HTMLImageElement>;

  constructor() {
    this.imageMap = new Map();
  }

  public load(url: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      if (!this.imageMap.has(url)) {
        const image = document.createElement("img");
        image.setAttribute("src", url);
        image.onload = () => {
          this.imageMap.set(url, image);
          resolve(image);
        };

        document.getElementById("assetsBay").appendChild(image);
      } else {
        resolve(this.imageMap.get(url));
      }
    });
  }

  public static getInstance(): SpriteLoader {
    if (!SpriteLoader.instance) {
      SpriteLoader.instance = new SpriteLoader();
    }
    return SpriteLoader.instance;
  }
}
