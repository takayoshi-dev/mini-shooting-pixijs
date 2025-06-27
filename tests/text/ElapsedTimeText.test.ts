import { ElapsedTimeText } from "@/text/ElapsedTimeText";

describe("ElapsedTimeText", () => {
  test("初期値は0で、textは 'TIME: 0.00'", () => {
    const text = new ElapsedTimeText(100, 200);
    expect(text.displayTime).toBe(0);
    expect(text.text).toBe("TIME: 0.00");
  });

  test("displayTime を更新すると text が更新される", () => {
    const text = new ElapsedTimeText(0, 0);
    text.displayTime = 12.3456;
    expect(text.displayTime).toBeCloseTo(12.3456, 5);
    expect(text.text).toBe("TIME: 12.35");
  });

  test("displayTime を小数第3位で四捨五入して表示する", () => {
    const text = new ElapsedTimeText(0, 0);
    text.displayTime = 7.994; // 四捨五入されて 7.99 → 7.99
    expect(text.text).toBe("TIME: 7.99");

    text.displayTime = 7.995; // 四捨五入されて 8.00
    expect(text.text).toBe("TIME: 8.00");
  });
});
