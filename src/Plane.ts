import { AngleUtils } from "@/utils/AngleUtils";
import { RenderableEntity } from "@/RenderableEntity";
import { LayerType, FactionType } from "@/constants";
import { Position, Vector2 } from "@/geometry";
import { Laser } from "@/Laser";
import { LayerManager } from "@/LayerManager";

/**
 * 汎用的な飛行機オブジェクトを表す基底クラス
 */
export class Plane extends RenderableEntity {
  /** 移動速度 */
  public speed: number;

  /** 射撃処理を開始するまでの待機タイマー（ミリ秒） */
  private fireCooldownTimer: number;

  /** 射撃後に再度発射できるまでのクールダウン時間（ミリ秒） */
  public readonly fireCooldownDurationMs: number = 0;

  /**
   * 所属陣営
   */
  public readonly factionType: FactionType;

  /** スコア */
  public readonly score: number;

  /**
   * コンストラクタ
   *
   * @param factionType 所属陣営
   * @param spawnPosition 初期表示位置（座標）
   * @param angle 初期の向き（角度、度数法）
   * @param speed 移動速度
   * @param layerName 描画先レイヤー名
   * @param fireCooldownDurationMs 射撃後に再発射可能になるまでの時間（ms）
   */
  constructor(
    factionType: FactionType,
    spawnPosition: Position,
    speed: number,
  ) {
    let angle: number;
    let layerName: LayerType;

    switch (factionType) {
      case FactionType.Player:
        angle = -90;
        layerName = LayerType.Player;
        break;
      case FactionType.Enemy:
        angle = 90;
        layerName = LayerType.Enemy;
        break;
      default:
        angle = 0;
        layerName = LayerType.Background;
        break;
    }
    super(spawnPosition, AngleUtils.calcRadians(angle), layerName);

    const fireCooldownDurationMs = 500;
    this.factionType = factionType;
    this.speed = speed;
    this.fireCooldownTimer = 0;
    if (fireCooldownDurationMs > 0) {
      this.fireCooldownDurationMs = fireCooldownDurationMs;
    }
    this.score = 0;

    switch (factionType) {
      case FactionType.Player:
        this.score = 0;
        break;
      case FactionType.Enemy:
        this.score = 5;
        break;
      default:
        break;
    }
  }

  /**
   * 上方向へ移動する。
   *
   * @param deltaMS フレーム間の経過時間（ミリ秒）
   * @param scoreBoost スコアに応じた速度補正値
   */
  public moveUp(deltaMS: number, scoreBoost: number): void {
    const distance = this.calcDistanceByScore(this.speed, deltaMS, scoreBoost);
    this.move(distance, this.angle);
  }

  /**
   * 下方向へ移動する。
   *
   * @param deltaMS フレーム間の経過時間（ミリ秒）
   * @param scoreBoost スコアに応じた速度補正値
   */
  public moveDown(deltaMS: number, scoreBoost: number): void {
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

  /**
   * レーザーを発射する。
   *
   * @param layerManager レイヤー管理インスタンス
   * @param lasers レーザー管理インスタンス
   */
  public fireLaser(layerManager: LayerManager, lasers: Set<Laser>): void {
    switch (this.factionType) {
      case FactionType.Player:
        this.firePlayerLaser(layerManager, lasers);
        break;
      case FactionType.Enemy:
        this.fireEnemyLaser(layerManager, lasers);
        break;
      default:
        break;
    }
  }

  private firePlayerLaser(
    layerManager: LayerManager,
    lasers: Set<Laser>,
  ): void {
    const laserSpeed = 200;
    const laserRadius = 1;
    const trailCount = 10;
    const trailIntervalMS = 15;
    const laserSideOffset = new Vector2(9, 9);

    if (!this.isFireCooldownFinished()) {
      return;
    }

    for (let i = 0; i < trailCount; i++) {
      const rightLaser = new Laser(
        this.x + laserSideOffset.x,
        this.y + laserSideOffset.y,
        laserRadius,
        -90,
        laserSpeed,
        trailIntervalMS * i,
        this.factionType,
      );
      layerManager.addChild(rightLaser);
      lasers.add(rightLaser);

      const leftLaser = new Laser(
        this.x - laserSideOffset.x,
        this.y + laserSideOffset.y,
        1,
        -90,
        200,
        trailIntervalMS * i,
        this.factionType,
      );
      layerManager.addChild(leftLaser);
      lasers.add(leftLaser);
    }
    this.startFireCooldown();
  }

  public fireEnemyLaser(layerManager: LayerManager, lasers: Set<Laser>): void {
    const laserSpeed = 200;
    const laserRadius = 1;
    const trailCount = 10;
    const trailIntervalMS = 15;

    if (!this.isFireCooldownFinished()) {
      return;
    }

    for (let i = 0; i < trailCount; i++) {
      const laser = new Laser(
        this.x,
        this.y,
        laserRadius,
        90,
        laserSpeed,
        trailIntervalMS * i,
        this.factionType,
      );
      layerManager.addChild(laser);
      lasers.add(laser);
    }
    this.startFireCooldown();
  }
}
