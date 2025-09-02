import { RandomUtils } from "@/utils";

describe("utils.RandomUtilsの単体テスト", () => {
  test("指定範囲の整数を返す", () => {
    for (let i = 0; i < 100; i++) {
      const result = RandomUtils.getRand(1, 5);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(5);
    }
  });

  test("minとmaxが同じ場合は、その値を返す", () => {
    const result = RandomUtils.getRand(3, 3);
    expect(result).toBe(3);
  });

  test("maxがminより小さくても、値がスワップされ、1から5が入る", () => {
    for (let i = 0; i < 100; i++) {
      const result = RandomUtils.getRand(5, 1);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(5);
    }
  });
});
