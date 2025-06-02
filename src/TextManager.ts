import { Container } from "pixi.js";
import type { ContainerChild } from "pixi.js";
import {
  ScoreText,
  ElapsedTimeText,
  DeltaTimeText,
  PlayerPositionText,
} from "./text";
import { runtimeFlags } from "./runtimeFlags";
import { gameConfig } from "./config/gameConfig";

/**
 * テキスト表示内容の更新に必要なデータ構造。
 *
 * 各値はオプションで、必要な項目のみ更新可能。
 */
interface TextUpdateParams {
  score: number;
  playerX: number;
  playerY: number;
  deltaMS: number;
  elapsedTime: number;
}

/**
 * テキストを一括管理するクラス
 */
export class TextManager {
  private _scoreText: ScoreText;
  private _playerPositionText: PlayerPositionText;
  private _deltaTimeText: DeltaTimeText;
  private _elapsedTimeText: ElapsedTimeText;

  /**
   * コンストラクタ
   *
   * @param container テキストを追加する PixiJS のコンテナ
   */
  constructor(container: Container<ContainerChild>) {
    this._elapsedTimeText = new ElapsedTimeText(10, 0);
    container.addChild(this._elapsedTimeText);

    this._scoreText = new ScoreText(10, 20);
    container.addChild(this._scoreText);

    this._playerPositionText = new PlayerPositionText(
      gameConfig.canvas.width / 2 + 100,
      0,
    );
    container.addChild(this._playerPositionText);

    this._deltaTimeText = new DeltaTimeText(
      gameConfig.canvas.width / 2 + 100,
      20,
    );
    container.addChild(this._deltaTimeText);
  }

  /**
   * スコア表示用のテキストオブジェクトを取得します。
   */
  get scoreText(): ScoreText {
    return this._scoreText;
  }

  /**
   * プレイヤー位置表示用のテキストオブジェクトを取得します。
   */
  get playerPositionText(): PlayerPositionText {
    return this._playerPositionText;
  }

  /**
   * デルタタイム表示用のテキストオブジェクトを取得します。
   */
  get deltaTimeText(): DeltaTimeText {
    return this._deltaTimeText;
  }

  /**
   * 経過時間表示用のテキストオブジェクトを取得します。
   */
  get elapsedTimeText(): ElapsedTimeText {
    return this._elapsedTimeText;
  }

  /**
   * 各種テキストの表示内容を更新します。
   *
   * @param data テキスト表示内容の更新に必要なデータ
   */
  public updateText(data: Partial<TextUpdateParams>): void {
    if (data.elapsedTime !== undefined) {
      this.elapsedTimeText.displayTime = data.elapsedTime;
    }

    if (data.score !== undefined) {
      this.scoreText.displayScore = data.score;
    }

    if (runtimeFlags.isDevMode) {
      if (data.playerX !== undefined) {
        this.playerPositionText.displayPlayerX = data.playerX;
      }

      if (data.playerY !== undefined) {
        this.playerPositionText.displayPlayerY = data.playerY;
      }

      if (data.deltaMS !== undefined) {
        this.deltaTimeText.displayDeltaMS = data.deltaMS;
      }
    }
  }
}
