import { Container } from "pixi.js";
import { TextManager } from "../src/TextManager";

describe("TextManager", () => {
  it("スコアと経過時間が更新されるべき", () => {
    const container = new Container();
    const textManager = new TextManager(container, true);
    textManager.updateText({
      score: 42,
      elapsedTime: 12.5,
    });

    expect(textManager.scoreText.displayScore).toBe(42);
    expect(textManager.elapsedTimeText.displayTime).toBe(12.5);
  });

  it("開発モードのとき、プレイヤーの位置とデルタ時間が更新されるべき", () => {
    const container = new Container();
    const textManager = new TextManager(container, true);
    textManager.updateText({
      playerX: 100,
      playerY: 200,
      deltaMS: 16,
    });

    expect(textManager.playerPositionText.displayPlayerX).toBe(100);
    expect(textManager.playerPositionText.displayPlayerY).toBe(200);
    expect(textManager.deltaTimeText.displayDeltaMS).toBe(16);
  });

  it("非開発モードのとき、プレイヤーの位置とデルタ時間が非表示にされるべき", () => {
    const container = new Container();
    const textManager = new TextManager(container, false);

    textManager.updateText({
      playerX: 100,
      playerY: 200,
      deltaMS: 16,
    });

    expect(textManager.playerPositionText.destroyed).toBe(true);
    expect(textManager.deltaTimeText.destroyed).toBe(true);
  });

  it("データの一部だけが提供されたときでもエラーを出さないべき", () => {
    const container = new Container();
    const textManager = new TextManager(container, true);
    expect(() =>
      textManager.updateText({
        score: 99,
      }),
    ).not.toThrow();
  });
});
