import { Sprite, Texture, Point } from "pixi.js";
import { Plane } from "./Plane";

/**
 * 敵機を表すクラス
 */
export class EnemyPlane extends Plane {
  /**
   * コンストラクタ
   *
   * 敵機体を生成する。
   *
   * @param x 初期X座標（画面上の左からの位置）
   * @param y 初期Y座標（画面上の上からの位置）
   * @param speed 移動速度
   * @param planeTexture 機体の見た目を表すテクスチャ（省略可）。指定しない場合はGraphicsを使用。
   */
  constructor(x: number, y: number, speed: number, planeTexture?: Texture) {
    super(new Point(x, y), 90, speed);

    this.graphics.fill(0x000000);
    this.graphics.stroke({ width: 1, color: 0xff0000 });

    if (planeTexture instanceof Texture) {
      const sprite = new Sprite(planeTexture);
      sprite.anchor.set(0.5);
      this.addChild(sprite);
    }
  }

  /**
   * コンテナとすべての子要素を破棄し、メモリを解放する。
   */
  public releaseResources(): void {
    super.destroy();
  }
}
