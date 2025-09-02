/**
 * 角度変換のためのユーティリティクラス
 *
 * 度（degrees）とラジアン（radians）の相互変換機能を提供します。
 */
export class AngleUtils {
  /**
   * 度をラジアンに変換します。
   *
   * @param degrees - 変換したい角度（度単位）
   * @returns ラジアン単位での角度
   */
  public static calcRadians(degrees: number): number {
    return (Math.PI / 180) * degrees;
  }

  /**
   * ラジアンを度に変換します。
   *
   * @param radians - 変換したい角度（ラジアン単位）
   * @returns 度単位での角度
   */
  public static calcDegrees(radians: number): number {
    return radians / (Math.PI / 180);
  }
}
