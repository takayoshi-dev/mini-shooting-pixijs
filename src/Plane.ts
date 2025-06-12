import { Container, Point, Graphics } from "pixi.js";
import { VectorUtils } from "./VectorUtils";
import { AngleUtils } from "./AngleUtils";
import { Vector2 } from "./Vector2";

/**
 * 汎用的な飛行機オブジェクトを表す基底クラス
 */
export class Plane extends Container {
  /** 移動速度 */
  private _speed: number;

  /** 簡易的な機体描画用のGraphicsインスタンス */
  private _graphics: Graphics;

  /**
   * コンストラクタ
   *
   * @param spawnPosition 初期表示位置（座標）
   * @param angle 初期の向き（角度、度数法）
   * @param speed 移動速度
   */
  constructor(spawnPosition: Point, angle: number, speed: number) {
    super({
      position: spawnPosition,
      rotation: AngleUtils.calcRadians(angle),
    });
    this.pivot = new Point(this.width / 2, this.height / 2);
    this._speed = speed;

    const radius = 10;
    const v1 = VectorUtils.createUnitVector(0).scale(radius);
    const v2 = VectorUtils.createUnitVector(120).scale(radius);
    const v3 = VectorUtils.createUnitVector(-120).scale(radius);
    this._graphics = new Graphics();
    this._graphics.poly([...v1.toArray(), ...v2.toArray(), ...v3.toArray()]);
    this._graphics.fill(0x000000);
    this._graphics.stroke({ width: 1, color: 0xffffff });
    this.addChild(this._graphics);
  }

  /**
   * 移動速度を取得する
   *
   * @returns 現在の移動速度
   */
  get speed(): number {
    return this._speed;
  }

  /**
   * 移動速度を設定する
   *
   * @param value 変更する移動速度
   */
  set speed(value: number) {
    this._speed = 0;
    if (value >= 0) {
      this._speed = value;
    }
  }

  /**
   * 簡易的な機体描画用のGraphicsインスタンスを取得する
   *
   * @returns Graphicsインスタンス
   */
  get graphics(): Graphics {
    return this._graphics;
  }

  /**
   * 上方向へ移動する。
   *
   * @param deltaMS フレーム間の経過時間（ミリ秒）
   * @param scoreBoost スコアに応じた速度補正値
   */
  public moveUp(deltaMS: number, scoreBoost: number): void {
    const distance = this.calcDistance(deltaMS, scoreBoost);
    this.move(distance, this.angle);
  }

  /**
   * 下方向へ移動する。
   *
   * @param deltaMS フレーム間の経過時間（ミリ秒）
   * @param scoreBoost スコアに応じた速度補正値
   */
  public moveDown(deltaMS: number, scoreBoost: number): void {
    const distance = this.calcDistance(deltaMS, scoreBoost);
    this.move(distance, this.angle + 180);
  }

  /**
   * 右方向へ移動する。
   *
   * @param deltaMS フレーム間の経過時間（ミリ秒）
   * @param scoreBoost スコアに応じた速度補正値
   */
  public moveRight(deltaMS: number, scoreBoost: number): void {
    const distance = this.calcDistance(deltaMS, scoreBoost);
    this.move(distance, this.angle + 90);
  }

  /**
   * 左方向へ移動する。
   *
   * @param deltaMS フレーム間の経過時間（ミリ秒）
   * @param scoreBoost スコアに応じた速度補正値
   */
  public moveLeft(deltaMS: number, scoreBoost: number): void {
    const distance = this.calcDistance(deltaMS, scoreBoost);
    this.move(distance, this.angle - 90);
  }

  /**
   * コンテナとその子要素をすべて破棄し、リソースを解放する。
   */
  public releaseResources(): void {
    this.destroy({ children: true });
  }

  /**
   * 与えられた距離と角度に従ってコンテナの位置を更新する。
   *
   * @param distance 移動距離
   * @param angle 移動方向（角度、度数法）
   */
  private move(distance: number, angle: number): void {
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
   * deltaMSとスコアブーストに基づいて移動距離を計算する。
   *
   * @param deltaMS フレーム間の経過時間（ミリ秒）
   * @param scoreBoost スコアによる速度補正
   * @returns 移動距離
   */
  private calcDistance(deltaMS: number, scoreBoost: number): number {
    return ((scoreBoost + this._speed) * deltaMS) / 1000;
  }
}
