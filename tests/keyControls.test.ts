import {
  keys,
  initKeyboardControls,
  removeKeyboardControls,
} from "../src/keyControls";
import { keyBindings } from "../src/config/keyConfig";

describe("キー入力による状態変化のテスト", () => {
  beforeEach(() => {
    keys.up = false;
    keys.down = false;
    keys.left = false;
    keys.right = false;
    keys.fire = false;
    initKeyboardControls();
  });

  afterEach(() => {
    removeKeyboardControls();
  });

  it("upに割り当てられたキーの押下", () => {
    expect(keyBindings.up.length).toBeGreaterThanOrEqual(1);

    keyBindings.up.forEach((value: string) => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: value }));
      expect(keys.up).toBe(true);
      expect(keys.down).toBe(false);
      expect(keys.left).toBe(false);
      expect(keys.right).toBe(false);
      expect(keys.fire).toBe(false);

      window.dispatchEvent(new KeyboardEvent("keyup", { key: value }));
      expect(keys.up).toBe(false);
      expect(keys.down).toBe(false);
      expect(keys.left).toBe(false);
      expect(keys.right).toBe(false);
      expect(keys.fire).toBe(false);
    });
  });

  it("downに割り当てられたキーの押下", () => {
    expect(keyBindings.down.length).toBeGreaterThanOrEqual(1);

    keyBindings.down.forEach((value: string) => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: value }));
      expect(keys.up).toBe(false);
      expect(keys.down).toBe(true);
      expect(keys.left).toBe(false);
      expect(keys.right).toBe(false);
      expect(keys.fire).toBe(false);

      window.dispatchEvent(new KeyboardEvent("keyup", { key: value }));
      expect(keys.up).toBe(false);
      expect(keys.down).toBe(false);
      expect(keys.left).toBe(false);
      expect(keys.right).toBe(false);
      expect(keys.fire).toBe(false);
    });
  });

  it("leftに割り当てられたキーの押下", () => {
    expect(keyBindings.left.length).toBeGreaterThanOrEqual(1);

    keyBindings.left.forEach((value: string) => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: value }));
      expect(keys.up).toBe(false);
      expect(keys.down).toBe(false);
      expect(keys.left).toBe(true);
      expect(keys.right).toBe(false);
      expect(keys.fire).toBe(false);

      window.dispatchEvent(new KeyboardEvent("keyup", { key: value }));
      expect(keys.up).toBe(false);
      expect(keys.down).toBe(false);
      expect(keys.left).toBe(false);
      expect(keys.right).toBe(false);
      expect(keys.fire).toBe(false);
    });
  });

  it("rightに割り当てられたキーの押下", () => {
    expect(keyBindings.right.length).toBeGreaterThanOrEqual(1);

    keyBindings.right.forEach((value: string) => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: value }));
      expect(keys.up).toBe(false);
      expect(keys.down).toBe(false);
      expect(keys.left).toBe(false);
      expect(keys.right).toBe(true);
      expect(keys.fire).toBe(false);

      window.dispatchEvent(new KeyboardEvent("keyup", { key: value }));
      expect(keys.up).toBe(false);
      expect(keys.down).toBe(false);
      expect(keys.left).toBe(false);
      expect(keys.right).toBe(false);
      expect(keys.fire).toBe(false);
    });
  });

  it("fireに割り当てられたキーの押下", () => {
    expect(keyBindings.fire.length).toBeGreaterThanOrEqual(1);

    keyBindings.fire.forEach((value: string) => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: value }));
      expect(keys.up).toBe(false);
      expect(keys.down).toBe(false);
      expect(keys.left).toBe(false);
      expect(keys.right).toBe(false);
      expect(keys.fire).toBe(true);

      window.dispatchEvent(new KeyboardEvent("keyup", { key: value }));
      expect(keys.up).toBe(false);
      expect(keys.down).toBe(false);
      expect(keys.left).toBe(false);
      expect(keys.right).toBe(false);
      expect(keys.fire).toBe(false);
    });
  });

  it("同時押し（left + fire）", () => {
    expect(keyBindings.left.length).toBeGreaterThanOrEqual(1);
    expect(keyBindings.fire.length).toBeGreaterThanOrEqual(1);

    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: keyBindings.left[0] }),
    );
    window.dispatchEvent(
      new KeyboardEvent("keydown", { key: keyBindings.fire[0] }),
    );

    expect(keys.up).toBe(false);
    expect(keys.down).toBe(false);
    expect(keys.left).toBe(true);
    expect(keys.right).toBe(false);
    expect(keys.fire).toBe(true);

    window.dispatchEvent(
      new KeyboardEvent("keyup", { key: keyBindings.left[0] }),
    );
    window.dispatchEvent(
      new KeyboardEvent("keyup", { key: keyBindings.fire[0] }),
    );

    expect(keys.up).toBe(false);
    expect(keys.down).toBe(false);
    expect(keys.left).toBe(false);
    expect(keys.right).toBe(false);
    expect(keys.fire).toBe(false);
  });

  it("未定義キー（z）で影響がないことを確認", () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "z" }));
    expect(keys.up).toBe(false);
    expect(keys.down).toBe(false);
    expect(keys.left).toBe(false);
    expect(keys.right).toBe(false);
    expect(keys.fire).toBe(false);
  });
});
