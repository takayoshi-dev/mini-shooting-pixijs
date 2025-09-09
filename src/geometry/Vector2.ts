/**
 * 2次元ベクトルを表すクラス
 *
 * 主に位置や移動量、方向ベクトルなどを表現・計算するために使用する。
 * 加算・減算・スカラー倍などの基本的なベクトル演算をサポートする。
 */
export class Vector2 {
  /** X成分（横方向） */
  private _x: number;

  /** Y成分（縦方向） */
  private _y: number;

  /**
   * 新しいベクトルを生成する。
   *
   * @param x X成分
   * @param y Y成分
   */
  constructor(x: number, y: number) {
    this._x = x;
    this._y = y;
  }

  /**
   * X成分を取得する。
   *
   * @returns X成分
   */
  get x(): number {
    return this._x;
  }

  /**
   * X成分を設定する。
   *
   * @param value X成分
   */
  set x(value: number) {
    this._x = value;
  }

  /**
   * Y成分を取得する。
   *
   * @returns Y成分
   */
  get y(): number {
    return this._y;
  }

  /**
   * Y成分を設定する。
   *
   * @param value Y成分
   */
  set y(value: number) {
    this._y = value;
  }

  /**
   * このベクトルを指定されたスカラーで拡大・縮小する。
   *
   * @param scalar 乗算するスカラー値
   * @returns 拡大・縮小後の新しいベクトル
   */
  public scale(scalar: number): Vector2 {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  /**
   * 他のベクトルと加算する。
   *
   * @param v 加算対象のベクトル
   * @returns 加算後の新しいベクトル
   */
  public add(v: Vector2): Vector2 {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  /**
   * 他のベクトルを減算する。
   *
   * @param v 減算対象のベクトル
   * @returns 減算後の新しいベクトル
   */
  public sub(v: Vector2): Vector2 {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  /**
   * このベクトルを `[x, y]` 配列形式に変換する。
   *
   * @returns 配列形式のベクトル
   */
  public toArray(): [number, number] {
    return [this.x, this.y];
  }
}
