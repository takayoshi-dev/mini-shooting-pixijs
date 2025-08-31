import { Point, Graphics } from "pixi.js";
import { Plane } from "@/Plane";
import { VectorUtils } from "@/VectorUtils";
import { LayerType } from "@/constants/LayerType";

/**
 * 敵機を表すクラス
 */
export class EnemyPlane extends Plane {
  /** スコア */
  public readonly score: number;

  /**
   * コンストラクタ
   *
   * 敵機体を生成する。
   *
   * @param x 初期X座標（画面上の左からの位置）
   * @param y 初期Y座標（画面上の上からの位置）
   * @param speed 移動速度
   * @param score 得点
   */
  constructor(x: number, y: number, speed: number, score: number) {
    super(new Point(x, y), 90, speed, LayerType.Enemy);
    this.score = score;

    const radius = this.score + 5;
    const v1 = VectorUtils.createUnitVector(0).scale(radius);
    const v2 = VectorUtils.createUnitVector(120).scale(radius);
    const v3 = VectorUtils.createUnitVector(-120).scale(radius);
    const graphics = new Graphics();
    graphics.poly([...v1.toArray(), ...v2.toArray(), ...v3.toArray()]);
    graphics.fill(0x000000);
    graphics.stroke({ width: 1, color: 0xff0000 });
    this.addChild(graphics);
  }
}
