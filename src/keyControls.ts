import { keyBindings } from "./config/keyConfig";

export type KeyState = {
  up: boolean;
  down: boolean;
  left: boolean;
  right: boolean;
};

export const keys: KeyState = {
  up: false,
  down: false,
  left: false,
  right: false,
};

export function initKeyboardControls(): boolean {
  window.addEventListener("keydown", (e) => {
    if (isKeyMatch(keyBindings.up, e.key)) {
      keys.up = true;
    }
    if (isKeyMatch(keyBindings.down, e.key)) {
      keys.down = true;
    }
    if (isKeyMatch(keyBindings.left, e.key)) {
      keys.left = true;
    }
    if (isKeyMatch(keyBindings.right, e.key)) {
      keys.right = true;
    }
  });
  window.addEventListener("keyup", (e) => {
    if (isKeyMatch(keyBindings.up, e.key)) {
      keys.up = false;
    }
    if (isKeyMatch(keyBindings.down, e.key)) {
      keys.down = false;
    }
    if (isKeyMatch(keyBindings.left, e.key)) {
      keys.left = false;
    }
    if (isKeyMatch(keyBindings.right, e.key)) {
      keys.right = false;
    }
  });
  return true;
}

function isKeyMatch(bindings: string[], key: string): boolean {
  return bindings.includes(key);
}
