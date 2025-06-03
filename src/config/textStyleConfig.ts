import { TextStyle } from "pixi.js";

export const textStyleConfig = {
  /** デフォルトのテキストスタイル */
  default: new TextStyle({
    fontFamily: "Arial",
    fontSize: 12,
    fill: 0xffffff,
    align: "center",
  }),

  /** スコア表示用のテキストスタイル */
  score: new TextStyle({
    fontFamily: "Courier",
    fontSize: 18,
    fill: 0xffff00,
  }),
};
