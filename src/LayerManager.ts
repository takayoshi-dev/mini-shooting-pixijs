import { Container } from "pixi.js";
import { LayerType } from "@/constants/LayerType";
import { RenderableEntity } from "@/RenderableEntity";
import { Layer } from "@/Layer";
import type { ContainerChild } from "pixi.js";

/**
 * ゲームシーンのレイヤー管理を行うクラス
 *
 * 主に、描画順の制御や`RenderableEntity`の所属レイヤー管理を目的として使用されます。
 * 各レイヤーは `LayerType` に基づいて `Container` として自動生成され、
 * 指定されたレイヤーに`RenderableEntity`を追加する機能を提供します。
 */
export class LayerManager {
  /** */
  private layers: Layer[] = [];

  /**
   * コンストラクタ
   *
   * 指定されたコンテナを親とし、`LayerType` の各レイヤー用の `Container` を作成し、親コンテナに追加します。
   *
   * @param parent 親 `Container` インスタンス
   */
  constructor(parent: Container<ContainerChild>) {
    for (const layerName of Object.values(LayerType)) {
      this.layers.push(new Layer(parent, layerName));
    }
  }

  /**
   * 指定されたレイヤー名の`Layer`インスタンスを取得する
   *
   * @param layerName レイヤー名
   * @returns `Layer`インスタンス
   */
  public getLayer(layerName: LayerType): Layer | undefined {
    return this.layers.find((layer) => layer.name === layerName);
  }

  /**
   * 指定されたエンティティを、その `layerType` に基づくレイヤーに追加します。
   *
   * @param entity レイヤーに追加する `RenderableEntity` インスタンス
   */
  public addChild(entity: RenderableEntity): void {
    const layer: Layer | undefined = this.getLayer(entity.layerType);
    if (layer instanceof Layer) {
      layer.attach(entity.container);
    }
  }
}
