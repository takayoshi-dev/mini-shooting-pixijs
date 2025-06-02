import { DeltaTimeText } from "../../src/text/DeltaTimeText";

describe("DeltaTimeText", () => {
  it("初期化時のdisplayDeltaMSとdisplayDeltaSecは0", () => {
    const deltaText = new DeltaTimeText(10, 20);
    expect(deltaText.displayDeltaMS).toBe(0);
    expect(deltaText.displayDeltaSec).toBe(0);
    expect(deltaText.text).toBe("deltaMS: 0");
  });

  it("displayDeltaMSを設定するとtextが更新される", () => {
    const deltaText = new DeltaTimeText(0, 0);
    deltaText.displayDeltaMS = 123;
    expect(deltaText.displayDeltaMS).toBe(123);
    expect(deltaText.text).toBe("deltaMS: 123");
  });

  it("displayDeltaSecを設定してもtextは変わらず、内部値だけ更新される", () => {
    const deltaText = new DeltaTimeText(0, 0);
    deltaText.displayDeltaSec = 4.56;
    expect(deltaText.displayDeltaSec).toBe(4.56);
    expect(deltaText.text).toBe("deltaMS: 0");
  });
});
