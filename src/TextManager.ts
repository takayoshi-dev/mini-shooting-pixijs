import { Container } from "pixi.js";
import type { ContainerChild } from "pixi.js";
import {
  ScoreText,
  ElapsedTimeText,
  DeltaTimeText,
  PlayerPositionText,
} from "./text";
import { gameConfig } from "./config/gameConfig";
import type { TextUpdateParams } from "./types";

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
   * @param isDevMode 開発モードかどうか（true の場合、デバッグ用のテキストを表示）
   */
  constructor(container: Container<ContainerChild>, isDevMode: boolean) {
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

    if (!isDevMode) {
      this._playerPositionText.destroy();
      this._deltaTimeText.destroy();
    }
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
    if (!this._elapsedTimeText.destroyed) {
      if (data.elapsedTime !== undefined) {
        this._elapsedTimeText.displayTime = data.elapsedTime;
      }
    }

    if (!this._scoreText.destroyed) {
      if (data.score !== undefined) {
        this._scoreText.displayScore = data.score;
      }
    }

    if (!this._playerPositionText.destroyed) {
      if (data.playerX !== undefined) {
        this._playerPositionText.displayPlayerX = data.playerX;
      }

      if (data.playerY !== undefined) {
        this._playerPositionText.displayPlayerY = data.playerY;
      }
      if (data.angle !== undefined) {
        this._playerPositionText.angle = data.angle;
      }
    }

    if (!this._deltaTimeText.destroyed) {
      if (data.deltaMS !== undefined) {
        this._deltaTimeText.displayDeltaMS = data.deltaMS;
      }
    }
  }
}
