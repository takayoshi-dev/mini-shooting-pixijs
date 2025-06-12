import { VectorUtils } from "../src/VectorUtils";
import { Vector2 } from "../src/Vector2";

describe("VectorUtils.createUnitVectorのテスト", () => {
  const testCases: Array<[number, Vector2]> = [
    [0, new Vector2(1, 0)],
    [90, new Vector2(0, 1)],
    [180, new Vector2(-1, 0)],
    [270, new Vector2(0, -1)],
    [-90, new Vector2(0, -1)],
    [360, new Vector2(1, 0)],
  ];

  test.each(testCases)(
    "角度%d度→正しい単位ベクトルを返すべき",
    (angle, expected) => {
      const vec = VectorUtils.createUnitVector(angle);
      expect(vec.x).toBeCloseTo(expected.x, 4);
      expect(vec.y).toBeCloseTo(expected.y, 4);
    },
  );

  test("任意の角度に対してベクトルの長さはほぼ1であるべき", () => {
    for (let angle = 0; angle < 360; angle += 15) {
      const vec = VectorUtils.createUnitVector(angle);
      const length = Math.hypot(vec.x, vec.y);
      expect(length).toBeCloseTo(1, 5);
    }
  });

  test("45度 → 約 (0.7071, 0.7071) を返す", () => {
    const vec = VectorUtils.createUnitVector(45);
    expect(vec.x).toBeCloseTo(Math.SQRT1_2, 4);
    expect(vec.y).toBeCloseTo(Math.SQRT1_2, 4);
  });

  test("135度 → 約 (-0.7071, 0.7071) を返す", () => {
    const vec = VectorUtils.createUnitVector(135);
    expect(vec.x).toBeCloseTo(-Math.SQRT1_2, 4);
    expect(vec.y).toBeCloseTo(Math.SQRT1_2, 4);
  });
});
