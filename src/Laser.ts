import { AngleUtils } from "@/utils";
import { RenderableEntity } from "@/RenderableEntity";
import { Position } from "@/geometry";
import { LayerType } from "@/constants/LayerType";
import { ShapeFactory } from "@/graphics";

export class Laser extends RenderableEntity {
  public speed: number;

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
  ) {
    super(
      new Position(x, y),
      AngleUtils.calcRadians(initialAngle),
      LayerType.Laser,
    );
    this.speed = initialSpeed;

    const graphics = ShapeFactory.makeCircle(radius);
    this.addChild(graphics);
  }
}
