import { DefaultText } from "./DefaultText";
import { textMessagesConfig } from "../config";

/**
 * スコア表示用のテキストクラス。
 */
export class ScoreText extends DefaultText {
  /** 表示用のスコア（画面に表示されるスコア） */
  private _displayScore: number;

  /** 実際のスコア（内部的に保持される真のスコア値） */
  private _actualScore: number;

  /**
   * コンストラクタ
   *
   * @param x テキストのX座標（画面上の表示位置）
   * @param y テキストのY座標（画面上の表示位置）
   */
  constructor(x: number, y: number) {
    super(x, y);
    this._displayScore = 0;
    this._actualScore = 0;
    this.updateDisplay();
  }

  /**
   * 表示用のスコアを取得する。
   */
  get displayScore(): number {
    return this._displayScore;
  }

  /**
   * 表示用のスコアを設定し、テキストを再描画する。
   *
   * @param value 表示用のスコア
   */
  set displayScore(value: number) {
    this._displayScore = value;
    this.updateDisplay();
  }

  /**
   * 実際のスコアを取得する。
   */
  get actualScore(): number {
    return this._actualScore;
  }

  /**
   * 実際のスコアを設定する。
   * ※表示は `displayScore` によって制御される。
   *
   * @param value 実際のスコア
   */
  set actualScore(value: number) {
    this._actualScore = value;
  }

  /**
   * `表示用のスコア` の値に基づいてテキスト内容を更新する。
   *
   * @override
   */
  override updateDisplay(): void {
    this.text = textMessagesConfig.score(this._displayScore);
  }
}
