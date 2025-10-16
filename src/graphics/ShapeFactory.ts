import { Graphics } from "pixi.js";
import { Position, Vector2 } from "@/geometry";
import { VectorUtils } from "@/utils/VectorUtils";

/**
 * 基本的な図形を生成するためのクラス
 */
export class ShapeFactory {
  /**
   * 円を生成する。
   *
   * @param radius 円の半径
   * @returns 円を描画した {@link Graphics} インスタンス
   */
  public static makeCircle(radius: number): Graphics {
    const offsetPosition = new Position(0, 0);
    const graphics = new Graphics();
    graphics.circle(offsetPosition.x, offsetPosition.y, radius);
    graphics.fill(0x000000);
    graphics.stroke({ width: 1, color: 0xff0000 });
    return graphics;
  }

  /**
   * 正三角形を生成する。
   *
   * @param radius 中心から各頂点までの距離
   * @returns 正三角形を描画した {@link Graphics} インスタンス
   */
  public static makeTriangle(radius: number, angle: number): Graphics {
    const offset = new Vector2(0, 0);
    const v1 = VectorUtils.createUnitVector(angle + 0)
      .scale(radius)
      .add(offset);
    const v2 = VectorUtils.createUnitVector(angle + 120)
      .scale(radius)
      .add(offset);
    const v3 = VectorUtils.createUnitVector(angle - 120)
      .scale(radius)
      .add(offset);
    const graphics = new Graphics();
    graphics.poly([...v1.toArray(), ...v2.toArray(), ...v3.toArray()]);
    graphics.fill(0x000000);
    graphics.stroke({ width: 1, color: 0xff0000 });
    return graphics;
  }

  /**
   * 正方形を生成する。
   *
   * @param radius 中心から各頂点までの距離
   * @param angle 正方形の回転角度（度数法）
   * @returns 正方形を描画した {@link Graphics} インスタンス
   */
  public static makeSquare(radius: number, angle: number): Graphics {
    const offset = new Vector2(0, 0);
    const v1 = VectorUtils.createUnitVector(angle).scale(radius).add(offset);
    const v2 = VectorUtils.createUnitVector(angle + 90)
      .scale(radius)
      .add(offset);
    const v3 = VectorUtils.createUnitVector(angle + 180)
      .scale(radius)
      .add(offset);
    const v4 = VectorUtils.createUnitVector(angle - 90)
      .scale(radius)
      .add(offset);
    const graphics = new Graphics();
    graphics.poly([
      ...v1.toArray(),
      ...v2.toArray(),
      ...v3.toArray(),
      ...v4.toArray(),
    ]);
    graphics.fill(0x000000);
    graphics.stroke({ width: 1, color: 0xff0000 });
    return graphics;
  }

  /**
   * 長方形を生成する。
   *
   * @param w 長方形の幅
   * @param h 長方形の高さ
   * @returns 長方形を描画した {@link Graphics} インスタンス
   */
  public static makeRectangle(w: number, h: number): Graphics {
    const offsetPosition = new Position(0, 0);
    const graphics = new Graphics();
    graphics.rect(offsetPosition.x, offsetPosition.y, w, h);
    graphics.fill(0x000000);
    graphics.stroke({ width: 1, color: 0xff0000 });
    return graphics;
  }
}
