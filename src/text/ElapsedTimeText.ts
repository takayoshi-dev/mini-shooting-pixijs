import { DefaultText } from "./DefaultText";

/**
 * 経過時間を表示するテキストクラス。
 */
export class ElapsedTimeText extends DefaultText {
  /** 表示用の経過時間（秒） */
  private _displayTime: number;

  /**
   * コンストラクタ
   *
   * @param x テキストのX座標（画面上の表示位置）
   * @param y テキストのY座標（画面上の表示位置）
   */
  constructor(x: number, y: number) {
    super(x, y);
    this._displayTime = 0;
    this.updateDisplay();
  }

  /**
   * 表示用の経過時間（秒）を取得する。
   */
  get displayTime(): number {
    return this._displayTime;
  }

  /**
   * 表示用の経過時間（秒）を設定し、テキストを再描画する。
   *
   * @param value 表示用の経過時間（秒）
   */
  set displayTime(value: number) {
    this._displayTime = value;
    this.updateDisplay();
  }

  /**
   * 現在の `表示用の経過時間（秒）` の値に基づいて、テキスト内容を更新する。
   *
   * @override
   */
  override updateDisplay(): void {
    this.text = `TIME: ${this._displayTime.toFixed(2)}`;
  }
}
