import { AngleUtils } from "@/utils/AngleUtils";
import { RenderableEntity } from "@/RenderableEntity";
import { LayerType } from "@/constants/LayerType";
import { Position } from "@/geometry";

/**
 * 汎用的な飛行機オブジェクトを表す基底クラス
 */
export class Plane extends RenderableEntity {
  /** 移動速度 */
  private _speed: number;

  /** 射撃処理を開始するまでの待機タイマー（ミリ秒） */
  private fireCooldownTimer: number;

  /** 射撃後に再度発射できるまでのクールダウン時間（ミリ秒） */
  public readonly fireCooldownDurationMs: number = 0;

  /**
   * コンストラクタ
   *
   * @param spawnPosition 初期表示位置（座標）
   * @param angle 初期の向き（角度、度数法）
   * @param speed 移動速度
   * @param layerName 描画先レイヤー名
   * @param fireCooldownDurationMs 射撃後に再発射可能になるまでの時間（ms）
   */
  constructor(
    spawnPosition: Position,
    angle: number,
    speed: number,
    layerName: LayerType,
    fireCooldownDurationMs: number,
  ) {
    super(spawnPosition, AngleUtils.calcRadians(angle), layerName);
    this._speed = speed;
    this.fireCooldownTimer = 0;
    if (fireCooldownDurationMs > 0) {
      this.fireCooldownDurationMs = fireCooldownDurationMs;
    }
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
   * 上方向へ移動する。
   *
   * @param deltaMS フレーム間の経過時間（ミリ秒）
   * @param scoreBoost スコアに応じた速度補正値
   */
  public moveUp(deltaMS: number, scoreBoost: number): void {
    const distance = this.calcDistanceByScore(this._speed, deltaMS, scoreBoost);
    this.move(distance, this.angle);
  }

  /**
   * 下方向へ移動する。
   *
   * @param deltaMS フレーム間の経過時間（ミリ秒）
   * @param scoreBoost スコアに応じた速度補正値
   */
  public moveDown(deltaMS: number, scoreBoost: number): void {
    const distance = this.calcDistanceByScore(this._speed, deltaMS, scoreBoost);
    this.move(distance, this.angle + 180);
  }

  /**
   * 右方向へ移動する。
   *
   * @param deltaMS フレーム間の経過時間（ミリ秒）
   * @param scoreBoost スコアに応じた速度補正値
   */
  public moveRight(deltaMS: number, scoreBoost: number): void {
    const distance = this.calcDistanceByScore(this._speed, deltaMS, scoreBoost);
    this.move(distance, this.angle + 90);
  }

  /**
   * 左方向へ移動する。
   *
   * @param deltaMS フレーム間の経過時間（ミリ秒）
   * @param scoreBoost スコアに応じた速度補正値
   */
  public moveLeft(deltaMS: number, scoreBoost: number): void {
    const distance = this.calcDistanceByScore(this._speed, deltaMS, scoreBoost);
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
    if (this.fireCooldownTimer > 0) {
      this.fireCooldownTimer -= deltaMS;
    }
  }

  /**
   * 射撃のクールダウンタイマーが終了しているかどうかを判定する。
   *
   * @returns true: 射撃可能、false: クールダウン中
   */
  public isFireCooldownFinished(): boolean {
    return this.fireCooldownTimer <= 0;
  }

  /**
   * 射撃後にクールダウンを開始する。
   */
  public startFireCooldown(): void {
    this.fireCooldownTimer = this.fireCooldownDurationMs;
  }
}
