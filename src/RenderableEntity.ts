import { Container, Point } from "pixi.js";
import { LayerType } from "./constants/LayerType";
import { VectorUtils } from "./VectorUtils";
import { Vector2 } from "./Vector2";

/**
 * エンティティの抽象基底クラス
 *
 * PixiJS の `Container` を継承し、レイヤー識別や移動処理、
 * アンカー設定、リソース解放といった共通機能を提供します。
 * ゲーム内のあらゆる描画オブジェクトの基礎クラスとして拡張されることを想定しています。
 */
export abstract class RenderableEntity extends Container {
  /**
   * このエンティティが属するレイヤーの識別子
   *
   * {@link LayerManager} によってレイヤーの分類と、そのレイヤーへエンティティ追加が行われる際に参照されます。
   */
  private _layerType: LayerType;

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
    super({
      position: position,
      rotation: rotation,
    });
    this.anchor(0.5, 0.5);
    this._layerType = layerType;
  }

  /**
   * 所属レイヤーを取得します。
   */
  public get layerType(): LayerType {
    return this._layerType;
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
    const planePositionVec: Vector2 = new Vector2(
      this.position.x,
      this.position.y,
    );
    const newPosition: Vector2 = planePositionVec.add(distanceVec);
    this.position.set(newPosition.x, newPosition.y);
  }

  /**
   * 指定された比率でアンカー（基準点）を設定します。
   *
   * @param x 横方向のアンカー（0.0 ～ 1.0）
   * @param y 縦方向のアンカー（0.0 ～ 1.0）
   */
  public anchor(x: number, y: number): void {
    if (0 <= x && x <= 1.0 && 0 <= y && y <= 1.0) {
      this.pivot = new Point(this.width * x, this.height * y);
    }
  }

  /**
   * このエンティティとその子要素を破棄し、リソースを解放します。
   */
  public releaseResources(): void {
    this.destroy({ children: true });
  }
}
