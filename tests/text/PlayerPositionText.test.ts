import { PlayerPositionText } from "@/text/PlayerPositionText";

describe("PlayerPositionText", () => {
  test("初期状態は X=0, Y=0 でテキストに反映される", () => {
    const playerText = new PlayerPositionText(100, 200);
    expect(playerText.displayPlayerX).toBe(0);
    expect(playerText.displayPlayerY).toBe(0);
    expect(playerText.text).toBe("playerX: 0, playerY: 0");
  });

  test("X座標を更新するとテキストに反映される", () => {
    const playerText = new PlayerPositionText(0, 0);
    playerText.displayPlayerX = 150;
    expect(playerText.text).toBe("playerX: 150, playerY: 0");
  });

  test("Y座標を更新するとテキストに反映される", () => {
    const playerText = new PlayerPositionText(0, 0);
    playerText.displayPlayerY = 75;
    expect(playerText.text).toBe("playerX: 0, playerY: 75");
  });

  test("X, Yの両方を更新すると両方反映される", () => {
    const playerText = new PlayerPositionText(0, 0);
    playerText.displayPlayerX = 30.5;
    playerText.displayPlayerY = 60.2;
    expect(playerText.text).toBe("playerX: 30.5, playerY: 60.2");
  });
});
