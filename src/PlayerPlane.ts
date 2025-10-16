import { Texture } from "pixi.js";
import { Plane } from "@/Plane";
import { LayerType } from "@/constants/LayerType";
import { Position, Vector2 } from "@/geometry";
import { SpriteFactory } from "@/graphics";
import { Laser } from "@/Laser";
import { LayerManager } from "@/LayerManager";

/**
 * プレイヤー用の飛行機クラス
 *
 * 基底クラス {@link Plane} を継承し、プレイヤー機特有のビジュアル処理を追加する。
 * テクスチャが与えられた場合は {@link Sprite} を使用し、なければベースとなるGraphicsを用いる。
 */
export class PlayerPlane extends Plane {
  /**
   * コンストラクタ
   *
   * プレイヤー機体を生成する。
   *
   * @param x 初期X座標
   * @param y 初期Y座標
   * @param speed 機体の移動速度
   * @param planeTexture 機体の見た目を表すテクスチャ
   */
  constructor(x: number, y: number, speed: number, planeTexture: Texture) {
    super(new Position(x, y), -90, speed, LayerType.Player, 500);
    this.width = planeTexture.width;
    this.height = planeTexture.height;

    const sprite = SpriteFactory.makeSprite(planeTexture);
    this.addChild(sprite);
  }

  /**
   * レーザーを発射する。
   *
   * @param layerManager レイヤー管理インスタンス
   * @param lasers レーザー管理インスタンス
   */
  public fireLaser(layerManager: LayerManager, lasers: Set<Laser>): void {
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
      );
      layerManager.addChild(leftLaser);
      lasers.add(leftLaser);
    }
    this.startFireCooldown();
  }
}
