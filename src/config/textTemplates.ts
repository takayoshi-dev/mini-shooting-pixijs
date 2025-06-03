export const textMessagesConfig = {
  /**
   * スコアの表示文言を生成する。
   *
   * @param displayScore 表示用のスコア値
   */
  score: (displayScore: number) => `SCORE: ${displayScore}`,

  /**
   * プレイヤー位置の表示文言を生成する。
   *
   * @param displayPlayerX プレイヤーのX座標
   * @param displayPlayerY プレイヤーのY座標
   */
  playerPosition: (displayPlayerX: number, displayPlayerY: number) =>
    `playerX: ${displayPlayerX}, playerY: ${displayPlayerY}`,

  /**
   * フレーム間の経過時間（ミリ秒）の表示文言を生成する。
   *
   * @param displayDeltaMS 経過ミリ秒
   */
  deltaTime: (displayDeltaMS: number) => `deltaMS: ${displayDeltaMS}`,

  /**
   * ゲーム経過時間（秒）の表示文言を生成する。
   *
   * @param displayTime 経過秒数
   */
  elapsedTime: (displayTime: number) => `TIME: ${displayTime.toFixed(2)}`,
};
