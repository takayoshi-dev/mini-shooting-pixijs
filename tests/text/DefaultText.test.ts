import { DefaultText } from "./../../src/text/DefaultText";

describe("DefaultTextクラスのテスト", () => {
  it("デフォルトのテキストと位置で初期化されること", () => {
    const text = new DefaultText(100, 200);
    expect(text.x).toBe(100);
    expect(text.y).toBe(200);
    expect(text.text).toBe("");
    expect(text.style.fontSize).toBe(12);
    expect(text.style.fontFamily).toBe("Arial");
    expect(text.style.fill).toBe(0xffffff);
  });

  it("カスタムのオプションが反映されること", () => {
    const text = new DefaultText(0, 0, {
      text: "Hello",
      style: {
        fontSize: 20,
        fill: 0xff0000,
      },
    });

    expect(text.text).toBe("Hello");
    expect(text.style.fontSize).toBe(20);
    expect(text.style.fill).toBe(0xff0000);
  });

  it("updateDisplay() をオーバーライドできること", () => {
    class TestText extends DefaultText {
      private counter = 0;

      public increment(): void {
        this.counter++;
        this.updateDisplay();
      }

      override updateDisplay(): void {
        this.text = `Count: ${this.counter}`;
      }
    }

    const testText = new TestText(0, 0);
    testText.increment();
    expect(testText.text).toBe("Count: 1");
    testText.increment();
    expect(testText.text).toBe("Count: 2");
  });
});
