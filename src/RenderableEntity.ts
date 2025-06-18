import { Container, Point } from "pixi.js";
import { LayerType } from "./constants/LayerType";
import { VectorUtils } from "./VectorUtils";
import { Vector2 } from "./Vector2";

export abstract class RenderableEntity extends Container {
  /**
   * このコンテナが属する描画レイヤーの識別子
   *
   * {@link LayerManager} クラスでのレイヤー自動振り分け処理に使用される。
   */
  private _layerType: LayerType;

  /**
   *
   * @param name
   */
  constructor(position: Point, rotation: number, layerType: LayerType) {
    super({
      position: position,
      rotation: rotation,
    });
    this.anchor(0.5, 0.5);
    this._layerType = layerType;
  }

  public get layerType(): LayerType {
    return this._layerType;
  }

  /**
   * 与えられた距離と角度に従ってコンテナの位置を更新する。
   *
   * @param distance 移動距離
   * @param angle 移動方向（角度、度数法）
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
   *
   * @param x
   * @param y
   */
  public anchor(x: number, y: number): void {
    if (0 <= x && x <= 1.0 && 0 <= y && y <= 1.0) {
      this.pivot = new Point(this.width * x, this.height * y);
    }
  }

  /**
   * コンテナとその子要素をすべて破棄し、リソースを解放する。
   */
  public releaseResources(): void {
    this.destroy({ children: true });
  }
}
