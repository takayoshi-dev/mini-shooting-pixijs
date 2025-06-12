import { AngleUtils } from "../src/AngleUtils";

describe("AngleUtils の角度変換ユーティリティ", () => {
  describe("calcRadians()", () => {
    test("0 度 → 0 ラジアン", () => {
      expect(AngleUtils.calcRadians(0)).toBeCloseTo(0);
    });

    test("180 度 → π ラジアン", () => {
      expect(AngleUtils.calcRadians(180)).toBeCloseTo(Math.PI, 5);
    });

    test("90 度 → π/2 ラジアン", () => {
      expect(AngleUtils.calcRadians(90)).toBeCloseTo(Math.PI / 2, 5);
    });

    test("-90 度 → -π/2 ラジアン", () => {
      expect(AngleUtils.calcRadians(-90)).toBeCloseTo(-Math.PI / 2, 5);
    });

    test("360 度 → 2π ラジアン", () => {
      expect(AngleUtils.calcRadians(360)).toBeCloseTo(Math.PI * 2, 5);
    });
  });

  describe("calcDegrees()", () => {
    test("0 ラジアン → 0 度", () => {
      expect(AngleUtils.calcDegrees(0)).toBeCloseTo(0);
    });

    test("π ラジアン → 180 度", () => {
      expect(AngleUtils.calcDegrees(Math.PI)).toBeCloseTo(180, 5);
    });

    test("π/2 ラジアン → 90 度", () => {
      expect(AngleUtils.calcDegrees(Math.PI / 2)).toBeCloseTo(90, 5);
    });

    test("-π/2 ラジアン → -90 度", () => {
      expect(AngleUtils.calcDegrees(-Math.PI / 2)).toBeCloseTo(-90, 5);
    });

    test("2π ラジアン → 360 度", () => {
      expect(AngleUtils.calcDegrees(Math.PI * 2)).toBeCloseTo(360, 5);
    });
  });

  describe("双方向変換の確認", () => {
    test("度→ラジアン→度が一致する", () => {
      const angles = [0, 45, 90, 180, 270, 360, -90];
      angles.forEach((deg) => {
        const rad = AngleUtils.calcRadians(deg);
        const result = AngleUtils.calcDegrees(rad);
        expect(result).toBeCloseTo(deg, 5);
      });
    });

    test("ラジアン→度→ラジアンが一致する", () => {
      const rads = [
        0,
        Math.PI / 4,
        Math.PI / 2,
        Math.PI,
        Math.PI * 2,
        -Math.PI / 2,
      ];
      rads.forEach((rad) => {
        const deg = AngleUtils.calcDegrees(rad);
        const result = AngleUtils.calcRadians(deg);
        expect(result).toBeCloseTo(rad, 5);
      });
    });
  });
});
