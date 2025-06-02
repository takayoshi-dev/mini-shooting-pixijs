import { ScoreText } from "../../src/text/ScoreText";

describe("ScoreText", () => {
  it("初期状態で displayScore, actualScore は 0、text も 'SCORE: 0'", () => {
    const scoreText = new ScoreText(10, 20);
    expect(scoreText.displayScore).toBe(0);
    expect(scoreText.actualScore).toBe(0);
    expect(scoreText.text).toBe("SCORE: 0");
  });

  it("displayScore を更新すると text も更新される", () => {
    const scoreText = new ScoreText(0, 0);
    scoreText.displayScore = 500;
    expect(scoreText.displayScore).toBe(500);
    expect(scoreText.text).toBe("SCORE: 500");
  });

  it("displayScore と actualScore を別々に保持できる", () => {
    const scoreText = new ScoreText(0, 0);
    scoreText.displayScore = 300;
    scoreText.actualScore = 1200;
    expect(scoreText.displayScore).toBe(300);
    expect(scoreText.actualScore).toBe(1200);
    expect(scoreText.text).toBe("SCORE: 300");
  });
});
