import { DefaultText } from "./DefaultText";

/**
 * プレイヤーの座標（X, Y）を表示するテキストクラス。
 */
export class PlayerPositionText extends DefaultText {
  /** 表示用のプレイヤーX座標 */
  private _displayPlayerX: number;

  /** 表示用のプレイヤーY座標 */
  private _displayPlayerY: number;

  /**
   * コンストラクタ
   *
   * @param x テキストのX座標（画面上の表示位置）
   * @param y テキストのY座標（画面上の表示位置）
   */
  constructor(x: number, y: number) {
    super(x, y);
    this._displayPlayerX = 0;
    this._displayPlayerY = 0;
    this.updateDisplay();
  }

  /**
   * 表示用のプレイヤーX座標を取得する。
   */
  get displayPlayerX(): number {
    return this._displayPlayerX;
  }

  /**
   * 表示用のプレイヤーX座標を設定し、テキストを再描画する。
   *
   * @param value 表示用のプレイヤーX座標
   */
  set displayPlayerX(value: number) {
    this._displayPlayerX = value;
    this.updateDisplay();
  }

  /**
   * 表示用のプレイヤーY座標を取得する。
   */
  get displayPlayerY(): number {
    return this._displayPlayerY;
  }

  /**
   * 表示用のプレイヤーY座標を設定し、テキストを再描画する。
   *
   * @param value 表示用のプレイヤーY座標
   */
  set displayPlayerY(value: number) {
    this._displayPlayerY = value;
    this.updateDisplay();
  }

  /**
   * `表示用のプレイヤーX座標`, `表示用のプレイヤーY座標` の値に基づいて、テキスト内容を更新する。
   *
   * @override
   */
  override updateDisplay(): void {
    this.text = `playerX: ${this._displayPlayerX}, playerY: ${this._displayPlayerY}`;
  }
}
