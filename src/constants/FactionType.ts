/**
 * レーザーや弾などの「所属（陣営）」を表す定数オブジェクト。
 *
 * - `Player` : プレイヤーが発射した弾・レーザー
 * - `Enemy`  : 敵が発射した弾・レーザー
 * - `Neutral`: どちらにも属さない（例：デコイ、演出用など）
 *
 * ゲーム内で「誰が撃った弾か」を判定することで、
 * 当たり判定・味方撃ち無効化・エフェクト切り替えなどに利用します。
 */
export const FactionType = {
  Player: "player",
  Enemy: "enemy",
  Neutral: "neutral",
} as const;

/**
 * `FactionType` 定数オブジェクトから生成される文字列リテラル型。
 */
export type FactionType = (typeof FactionType)[keyof typeof FactionType];
