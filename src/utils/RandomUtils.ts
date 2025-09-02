/**
 * 乱数生成のためのユーティリティクラス
 */
export class RandomUtils {
  /**
   * min 以上 max 以下の整数乱数を返す
   * @param min 最小値
   * @param max 最大値
   */
  public static getRand(min: number, max: number): number {
    if (min > max) {
      const temp = min;
      min = max;
      max = temp;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
