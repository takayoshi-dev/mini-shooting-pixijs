import { Sprite, Texture, Point } from "pixi.js";
import { Plane } from "./Plane";

/**
 * プレイヤー用の飛行機クラス
 *
 * 基底クラス {@link Plane} を継承し、プレイヤー機特有のビジュアル処理を追加する。
 * テクスチャが与えられた場合は {@link Sprite} を使用し、なければベースとなるGraphicsを用いる。
 */
export class PlayerPlane extends Plane {
  constructor(x: number, y: number, speed: number);
  constructor(x: number, y: number, speed: number, planeTexture: Texture);

  /**
   * コンストラクタ
   *
   * プレイヤー機体を生成する。
   *
   * @param x 初期X座標
   * @param y 初期Y座標
   * @param speed 機体の移動速度
   * @param planeTexture 機体の見た目を表すテクスチャ（省略可）。指定しない場合はGraphicsが使用される。
   */
  constructor(x: number, y: number, speed: number, planeTexture?: Texture) {
    super(new Point(x, y), -90, speed);

    this.graphics.fill(0x000000);
    this.graphics.stroke({ width: 1, color: 0x0000ff });

    if (planeTexture instanceof Texture) {
      this.graphics.visible = false;
      const sprite = new Sprite(planeTexture);
      sprite.anchor.set(0.5);
      this.addChild(sprite);
    }
  }

  /**
   * コンテナおよび子要素を破棄し、リソースを解放する。
   */
  public releaseResources(): void {
    super.destroy();
  }
}
