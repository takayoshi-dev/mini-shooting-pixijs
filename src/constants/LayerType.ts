/**
 * レイヤーの種類を定義する定数オブジェクト
 *
 * 描画や処理の優先順位などに応じて、シーン内のオブジェクトを分類するために使用されます。
 * 各キーは論理的なレイヤー名を、各値は識別子（文字列）を表します。
 */
export const LayerType = {
  Background: "background",
  Laser: "laser",
  Enemy: "enemy",
  Player: "player",
  UI: "ui",
} as const;

/**
 * `LayerType` 定数オブジェクトの値から構成される型
 *
 * 各レイヤー識別子のいずれかを表します。
 */
export type LayerType = (typeof LayerType)[keyof typeof LayerType];
