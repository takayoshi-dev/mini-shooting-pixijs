import { Sprite, Texture } from "pixi.js";

/**
 * スプライトを生成するためのクラス
 */
export class SpriteFactory {
  /**
   * 指定したテクスチャから {@link Sprite} を生成する。
   * @param planeTexture 使用するテクスチャ
   * @returns 指定されたテクスチャの {@link Sprite} インスタンス
   */
  public static makeSprite(planeTexture: Texture): Sprite {
    const sprite = new Sprite(planeTexture);
    sprite.anchor.set(0.5);
    return sprite;
  }
}
