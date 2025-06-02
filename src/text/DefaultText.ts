import { Text, TextStyle } from "pixi.js";
import type { TextOptions } from "pixi.js";

/**
 * 共通のスタイルと配置指定を持つ、基本的なテキストクラス。
 *
 * 各種 UI テキスト（スコア、タイマー、デバッグ表示など）の基底クラスとして使用される。
 * オプションが省略された場合は、デフォルトのスタイルと空文字を使用する。
 */
export class DefaultText extends Text {
  /**
   * デフォルトのテキストスタイル（全テキスト共通）
   */
  private static readonly defaultTextStyle = new TextStyle({
    fontFamily: "Arial",
    fontSize: 12,
    fill: 0xffffff,
    align: "center",
  });

  /**
   * コンストラクタ
   *
   * @param x テキストのX座標
   * @param y テキストのY座標
   * @param options テキストオプション
   */
  constructor(x: number, y: number, options?: TextOptions) {
    if (typeof options === "undefined") {
      options = {
        text: ``,
        style: DefaultText.defaultTextStyle,
        anchor: 0.0,
      };
    }
    super(options);
    this.x = x;
    this.y = y;
  }

  /**
   * テキスト表示内容を更新するメソッド。
   *
   * サブクラスで `override` して、表示内容を動的に変更する用途に使用する。
   */
  protected updateDisplay(): void {
    this.text = "";
  }
}
