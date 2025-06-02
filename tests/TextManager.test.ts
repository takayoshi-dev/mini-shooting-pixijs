import { Container } from "pixi.js";
import { TextManager } from "../src/TextManager";

jest.mock("../src/runtimeFlags", () => ({
  runtimeFlags: { isDevMode: true },
}));

describe("TextManager", () => {
  let textManager: TextManager;

  beforeEach(() => {
    const container = new Container();
    textManager = new TextManager(container);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("スコアと経過時間が更新されるべき", () => {
    textManager.updateText({
      score: 42,
      elapsedTime: 12.5,
    });

    expect(textManager.scoreText.displayScore).toBe(42);
    expect(textManager.elapsedTimeText.displayTime).toBe(12.5);
  });

  it("開発モードのとき、プレイヤーの位置とデルタ時間が更新されるべき", () => {
    textManager.updateText({
      playerX: 100,
      playerY: 200,
      deltaMS: 16,
    });

    expect(textManager.playerPositionText.displayPlayerX).toBe(100);
    expect(textManager.playerPositionText.displayPlayerY).toBe(200);
    expect(textManager.deltaTimeText.displayDeltaMS).toBe(16);
  });

  it("データの一部だけが提供されたときでもエラーを出さないべき", () => {
    expect(() =>
      textManager.updateText({
        score: 99,
      }),
    ).not.toThrow();
  });
});
