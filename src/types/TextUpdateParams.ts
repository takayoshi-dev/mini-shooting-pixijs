/**
 * テキストUIの更新に使用されるパラメータを定義するインターフェース
 *
 * スコアやプレイヤーの座標、経過時間など、`TextManager.updateText()` に渡す情報を表します。
 */
export interface TextUpdateParams {
  /**  現在のスコア */
  score: number;

  /** プレイヤーのX座標 */
  playerX: number;

  /** プレイヤーのY座標 */
  playerY: number;

  /** 直近フレームの経過時間（ミリ秒） */
  deltaMS: number;

  /** ゲーム開始からの累積経過時間（秒） */
  elapsedTime: number;
}
