import { keyBindings } from "./config/keyConfig";

type KeyEventType = "keydown" | "keyup";
type ListenerEntry = {
  type: KeyEventType;
  listener: (e: KeyboardEvent) => void;
};
const registeredListeners: ListenerEntry[] = [];

export const keys = {
  up: false,
  down: false,
  left: false,
  right: false,
  fire: false,
};

/**
 * キーボード入力を初期化する
 *
 * @returns {boolean} 初期化が成功した場合は `true`、失敗した場合は `false`を返す。
 */
export function initKeyboardControls(): boolean {
  if (registeredListeners.length > 0) {
    return false;
  }

  const types: KeyEventType[] = ["keydown", "keyup"];
  types.forEach((eventType) => {
    let isPressed = false;
    if (eventType === "keydown") {
      isPressed = true;
    }

    const listener = (e: KeyboardEvent) => {
      if (isKeyMatch(keyBindings.up, e.key)) {
        keys.up = isPressed;
      }
      if (isKeyMatch(keyBindings.down, e.key)) {
        keys.down = isPressed;
      }
      if (isKeyMatch(keyBindings.left, e.key)) {
        keys.left = isPressed;
      }
      if (isKeyMatch(keyBindings.right, e.key)) {
        keys.right = isPressed;
      }
      if (isKeyMatch(keyBindings.fire, e.key)) {
        keys.fire = isPressed;
      }
    };

    window.addEventListener(eventType, listener);
    registeredListeners.push({ type: eventType, listener });
  });

  return true;
}

/**
 * キーボード操作のために登録された全てのイベントリスナーを解除します。
 *
 * @returns {void} 戻り値はありません。
 */
export function removeKeyboardControls(): void {
  registeredListeners.forEach(({ type, listener }) => {
    window.removeEventListener(type, listener);
  });
  registeredListeners.length = 0;
}

/**
 * 指定されたキーが、設定されたキー割り当てに含まれるか判定する
 *
 * @param {string[]} bindings 設定されたキー配列
 * @param {string} key 押されたキー
 * @returns {boolean} 含まれる場合は `true'、そうでない場合は `false`。
 */
function isKeyMatch(bindings: string[], key: string): boolean {
  if (!Array.isArray(bindings)) {
    return false;
  }
  return bindings.includes(key);
}
