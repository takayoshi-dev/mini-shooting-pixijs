import { Plane } from "@/Plane";
import { LayerType } from "@/constants/LayerType";
import { Position } from "@/geometry";
import { ShapeFactory } from "@/graphics";

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
  constructor(x: number, y: number, speed: number, radius: number) {
    super(new Position(x, y), 90, speed, LayerType.Enemy);
    this.score = 5;
    this.width = radius * 2;
    this.height = radius * 2;

    const graphics = ShapeFactory.makeTriangle(radius, 0);
    this.addChild(graphics);
  }
}
