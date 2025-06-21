import { RenderLayer, Container } from "pixi.js";
import type { IRenderLayer, ContainerChild } from "pixi.js";

/**
 * レイヤーを管理するクラス
 *
 * `Container` は論理的な親子関係を、`RenderLayer` は描画順の制御を担当します。
 */
export class Layer {
  /** 親コンテナ */
  public readonly parentContainer: Container<ContainerChild>;

  /** レイヤーの実体 */
  public readonly renderLayer: IRenderLayer;

  /** レイヤー名 */
  public readonly name: string;

  /**
   * コンストラクタ
   *
   * @param parent - 子オブジェクトを格納する親コンテナ
   * @param layerName - レイヤーの識別名称
   */
  constructor(parent: Container<ContainerChild>, layerName: string) {
    this.parentContainer = parent;
    this.renderLayer = new RenderLayer();
    this.name = layerName;
    parent.addChild(this.renderLayer);
  }

  /**
   * 指定したオブジェクトをレイヤーと親コンテナに追加する。
   *
   * @param child - 描画対象のコンテナオブジェクト
   */
  public attach(child: Container<ContainerChild>): void {
    this.parentContainer.addChild(child);
    this.renderLayer.attach(child);
  }
}
