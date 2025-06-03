import { DefaultText } from "./DefaultText";
import { textMessagesConfig } from "../config";

/**
 * フレーム間の経過時間（デルタタイム）を表示するテキストクラス。
 */
export class DeltaTimeText extends DefaultText {
  /** 表示用のデルタ時間（ミリ秒） */
  private _displayDeltaMS: number;

  /** 表示用のデルタ時間（秒） */
  private _displayDeltaSec: number;

  /**
   * コンストラクタ
   *
   * @param x テキストのX座標（画面上の表示位置）
   * @param y テキストのY座標（画面上の表示位置）
   */
  constructor(x: number, y: number) {
    super(x, y);
    this._displayDeltaMS = 0;
    this._displayDeltaSec = 0;
    this.updateDisplay();
  }

  /**
   * 表示用のデルタ時間（ミリ秒）を取得する。
   */
  get displayDeltaMS(): number {
    return this._displayDeltaMS;
  }

  /**
   * 表示用のデルタ時間（ミリ秒）を設定し、テキストを再描画する。
   *
   * @param value デルタ時間（ms）
   */
  set displayDeltaMS(value: number) {
    this._displayDeltaMS = value;
    this.updateDisplay();
  }

  /**
   * 表示用のデルタ時間（秒）を取得する。
   */
  get displayDeltaSec(): number {
    return this._displayDeltaSec;
  }

  /**
   * 表示用のデルタ時間（秒）を設定し、テキストを再描画する。
   *
   * @param value デルタ時間（秒）
   */
  set displayDeltaSec(value: number) {
    this._displayDeltaSec = value;
    this.updateDisplay();
  }

  /**
   * `表示用のデルタ時間（ミリ秒）` に基づいて、テキスト内容を更新する。
   *
   * @override
   */
  override updateDisplay(): void {
    this.text = textMessagesConfig.deltaTime(this._displayDeltaMS);
  }
}
