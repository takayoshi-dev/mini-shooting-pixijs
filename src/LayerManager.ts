import { Container } from "pixi.js";
import { LayerType } from "./constants/LayerType";
import { RenderableEntity } from "./RenderableEntity";
import type { ContainerChild } from "pixi.js";

export class LayerManager {
  private _mainContainer: Container;

  constructor(container: Container<ContainerChild>) {
    this._mainContainer = container;
    for (const layerLabel of Object.values(LayerType)) {
      const layer = new Container({ label: layerLabel });
      container.addChild(layer);
    }
  }

  public getLayer(label: LayerType): Container | null {
    return this._mainContainer.getChildByLabel(label);
  }

  public addChild(entity: RenderableEntity): void {
    const layer = this.getLayer(entity.layerType);
    if (layer != null) {
      layer.addChild(entity);
    }
  }
}
