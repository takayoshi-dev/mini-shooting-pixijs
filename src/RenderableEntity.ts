import { Container, Point } from "pixi.js";
import type { ContainerChild } from "pixi.js";
import { LayerType } from "@/constants/LayerType";
import { VectorUtils } from "@/VectorUtils";
import { Vector2 } from "@/Vector2";

/**
 * エンティティの抽象基底クラス
 *
 * PixiJS の `Container` を継承し、レイヤー識別や移動処理、
 * アンカー設定、リソース解放といった共通機能を提供します。
 * ゲーム内のあらゆる描画オブジェクトの基礎クラスとして拡張されることを想定しています。
 */
export abstract class RenderableEntity {
  /** */
  public readonly container: Container;

  /**
   * このエンティティが属するレイヤーの識別子
   *
   * {@link LayerManager} によってレイヤーの分類と、そのレイヤーへエンティティ追加が行われる際に参照されます。
   */
  public readonly layerType: LayerType;

  /**
   * コンストラクタ
   *
   * 初期位置・回転角度・所属レイヤーを指定してコンテナを初期化します。
   *
   * @param position 初期位置
   * @param rotation 回転角度（ラジアン）
   * @param layerType 所属レイヤーの識別子
   */
  constructor(position: Point, rotation: number, layerType: LayerType) {
    this.container = new Container({
      position: position,
      rotation: rotation,
    });
    this.anchor(0.5, 0.5);
    this.layerType = layerType;
  }

  /**
   * X成分を取得する。
   *
   * @returns X成分
   */
  get x(): number {
    return this.container.position.x;
  }

  /**
   * X成分を設定する。
   *
   * @param value X成分
   */
  set x(value: number) {
    this.container.position.x = value;
  }

  /**
   * Y成分を取得する。
   *
   * @returns Y成分
   */
  get y(): number {
    return this.container.position.y;
  }

  /**
   * Y成分を設定する。
   *
   * @param value Y成分
   */
  set y(value: number) {
    this.container.position.y = value;
  }

  get width(): number {
    return this.container.width;
  }

  set width(value: number) {
    this.container.width = value;
  }

  get height(): number {
    return this.container.height;
  }

  set height(value: number) {
    this.container.height = value;
  }

  get angle(): number {
    return this.container.angle;
  }

  set angle(value: number) {
    this.container.angle = value;
  }

  /**
   * 指定された移動距離と角度に基づいてエンティティの位置を移動します。
   *
   * @param distance 移動距離
   * @param angle 移動角度（度数法）
   */
  protected move(distance: number, angle: number): void {
    const distanceVec: Vector2 =
      VectorUtils.createUnitVector(angle).scale(distance);
    const planePositionVec: Vector2 = new Vector2(this.x, this.y);
    const newPosition: Vector2 = planePositionVec.add(distanceVec);
    this.x = newPosition.x;
    this.y = newPosition.y;
  }

  /**
   * 指定された比率でアンカー（基準点）を設定します。
   *
   * @param x 横方向のアンカー（0.0 ～ 1.0）
   * @param y 縦方向のアンカー（0.0 ～ 1.0）
   */
  public anchor(x: number, y: number): void {
    if (0 <= x && x <= 1.0 && 0 <= y && y <= 1.0) {
      this.container.pivot = new Point(this.width * x, this.height * y);
    }
  }

  /**
   * このエンティティとその子要素を破棄し、リソースを解放します。
   */
  public releaseResources(): void {
    this.container.destroy({ children: true });
  }

  public addChild(value: Container<ContainerChild>): void {
    this.container.addChild(value);
  }
}
