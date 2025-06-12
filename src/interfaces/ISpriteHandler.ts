import { Sprite } from "pixi.js";

export interface ISpriteHandler {
  sprite: Sprite;
  syncSprite(): void;
  releaseSprite(): void;
}
