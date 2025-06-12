import { Vector2 } from "./Vector2";
import { AngleUtils } from "./AngleUtils";

/**
 * ベクトル操作に関するユーティリティクラス
 *
 * 角度をベクトルに変換するなど、空間演算に関連する補助的な関数を提供する。
 */
export class VectorUtils {
  /**
   * 角度（度数法）から単位ベクトルを生成する。
   *
   * 例：0度 → (1, 0)、90度 → (0, 1)
   *
   * @param angle 角度（度数法）
   * @returns 指定された角度に対応する単位ベクトル（長さ1の {@link Vector2}）
   */
  public static createUnitVector(angle: number): Vector2 {
    const radians = AngleUtils.calcRadians(angle);
    return new Vector2(Math.cos(radians), Math.sin(radians));
  }
}
