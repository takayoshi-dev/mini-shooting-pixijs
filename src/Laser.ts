import { AngleUtils } from "@/utils";
import { RenderableEntity } from "@/RenderableEntity";
import { Position } from "@/geometry";
import { LayerType } from "@/constants/LayerType";
import { ShapeFactory } from "@/graphics";

export class Laser extends RenderableEntity {
  /**
   * 移動速度
   */
  public speed: number;

  /**
   * 移動処理を開始するまでの待機タイマー（ミリ秒）
   */
  private movementWaitTimer: number;

  /**
   * コンストラクタ
   *
   * @param x 初期X座標
   * @param y 初期Y座標
   * @param radius 半径
   * @param initialAngle 初期の向き（角度、度数法）
   * @param initialSpeed 移動速度
   */
  constructor(
    x: number,
    y: number,
    radius: number,
    initialAngle: number,
    initialSpeed: number,
    moveDelayMs: number,
  ) {
    super(
      new Position(x, y),
      AngleUtils.calcRadians(initialAngle),
      LayerType.Laser,
    );
    this.speed = initialSpeed;
    this.movementWaitTimer = moveDelayMs;

    const graphics = ShapeFactory.makeCircle(radius);
    this.addChild(graphics);
    this.visible = false;
  }

  /**
   * 上方向へ移動する。
   *
   * @param deltaMS フレーム間の経過時間（ミリ秒）
   * @param scoreBoost スコアに応じた速度補正値
   */
  public moveUp(deltaMS: number, scoreBoost: number): void {
    if (!this.isMovementWaitFinished()) {
      return;
    }
    const distance = this.calcDistanceByScore(this.speed, deltaMS, scoreBoost);
    this.move(distance, this.angle);
    this.visible = true;
  }

  /**
   * 下方向へ移動する。
   *
   * @param deltaMS フレーム間の経過時間（ミリ秒）
   * @param scoreBoost スコアに応じた速度補正値
   */
  public moveDown(deltaMS: number, scoreBoost: number): void {
    if (!this.isMovementWaitFinished()) {
      return;
    }
    const distance = this.calcDistanceByScore(this.speed, deltaMS, scoreBoost);
    this.move(distance, this.angle + 180);
  }

  /**
   * 右方向へ移動する。
   *
   * @param deltaMS フレーム間の経過時間（ミリ秒）
   * @param scoreBoost スコアに応じた速度補正値
   */
  public moveRight(deltaMS: number, scoreBoost: number): void {
    if (!this.isMovementWaitFinished()) {
      return;
    }
    const distance = this.calcDistanceByScore(this.speed, deltaMS, scoreBoost);
    this.move(distance, this.angle + 90);
  }

  /**
   * 左方向へ移動する。
   *
   * @param deltaMS フレーム間の経過時間（ミリ秒）
   * @param scoreBoost スコアに応じた速度補正値
   */
  public moveLeft(deltaMS: number, scoreBoost: number): void {
    if (!this.isMovementWaitFinished()) {
      return;
    }
    const distance = this.calcDistanceByScore(this.speed, deltaMS, scoreBoost);
    this.move(distance, this.angle - 90);
  }

  /**
   * deltaMSとスコアブーストに基づいて移動距離を計算する。
   *
   * @param speed 移動速度
   * @param deltaMS フレーム間の経過時間（ミリ秒）
   * @param scoreBoost スコアによる速度補正
   * @returns 移動距離
   */
  private calcDistanceByScore(
    speed: number,
    deltaMS: number,
    scoreBoost: number,
  ): number {
    return ((scoreBoost + speed) * deltaMS) / 1000;
  }

  /**
   * タイマー系の値を更新する。
   *
   * @param deltaMS 前フレームからの経過時間（ミリ秒）
   */
  public updateTimers(deltaMS: number): void {
    if (this.movementWaitTimer > 0) {
      this.movementWaitTimer -= deltaMS;
    }
  }

  /**
   * 移動待機タイマーが終了しているかどうかを判定する。
   *
   * @returns true: 移動可能、 false: 移動待機中
   */
  public isMovementWaitFinished(): boolean {
    return this.movementWaitTimer <= 0;
  }
}
