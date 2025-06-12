import { Plane } from "../src/Plane";
import { Point } from "pixi.js";

/**
 * Planeクラスのユニットテスト
 */
describe("Plane クラス", () => {
  const initialX = 100;
  const initialY = 200;
  const speed = 100;

  const dummyDeltaMS = 1000; // 1秒相当
  const dummyBoost = 0;

  test("初期位置が正しく設定されること", () => {
    const plane = new Plane(new Point(initialX, initialY), -90, speed);
    expect(plane.position.x).toBe(initialX);
    expect(plane.position.y).toBe(initialY);
  });

  test("上方向に移動できる（angle = 0）", () => {
    const plane = new Plane(new Point(0, 0), -90, 100);
    plane.moveUp(dummyDeltaMS, dummyBoost);
    expect(plane.position.x).toBeCloseTo(0, 5);
    expect(plane.position.y).toBeCloseTo(-100, 5);
  });

  test("下方向に移動できる（angle = 0 → 180度）", () => {
    const plane = new Plane(new Point(0, 0), -90, 100);
    plane.moveDown(dummyDeltaMS, dummyBoost);
    expect(plane.position.x).toBeCloseTo(0, 5);
    expect(plane.position.y).toBeCloseTo(100, 5);
  });

  test("右方向に移動できる（angle = 0 → +90度）", () => {
    const plane = new Plane(new Point(0, 0), -90, 100);
    plane.moveRight(dummyDeltaMS, dummyBoost);
    expect(plane.position.x).toBeCloseTo(100, 5);
    expect(plane.position.y).toBeCloseTo(0, 5);
  });

  test("左方向に移動できる（angle = 0 → -90度）", () => {
    const plane = new Plane(new Point(0, 0), -90, 100);
    plane.moveLeft(dummyDeltaMS, dummyBoost);
    expect(plane.position.x).toBeCloseTo(-100, 5);
    expect(plane.position.y).toBeCloseTo(0, 5);
  });

  test("スコアブーストを反映した移動距離の増加", () => {
    const plane = new Plane(new Point(0, 0), 0, 100);
    plane.moveUp(dummyDeltaMS, 100); // speed + boost = 200 → 200px移動
    expect(plane.position.x).toBeCloseTo(200, 5);
    expect(plane.position.y).toBeCloseTo(0, 5);
  });

  test("負の speed をセットすると 0 にクリアされる", () => {
    const plane = new Plane(new Point(0, 0), 0, 100);
    plane.speed = -100;
    expect(plane.speed).toBe(0);
  });

  test("releaseResources() で destroy が呼ばれる（破棄される）", () => {
    const plane = new Plane(new Point(0, 0), 0, 100);
    const destroySpy = jest.spyOn(plane, "destroy");
    plane.releaseResources();
    expect(destroySpy).toHaveBeenCalledWith({ children: true });
  });
});
