import { Application, Assets, Sprite, isMobile } from "pixi.js";
import { keys, initKeyboardControls } from "./keyControls";
import { gameConfig } from "./config/gameConfig";
import { assetManifest } from "./manifest/assetManifest";
import { TextManager } from "./TextManager";
import type { RuntimeFlags } from "./types";

(async () => {
  const runtimeFlags: RuntimeFlags = {
    isDevMode: import.meta.env.MODE !== "production",
    isMobile: isMobile.any,
  };

  const app = await createApplication(runtimeFlags);
  document.body.appendChild(app.canvas);

  await Assets.init({ manifest: assetManifest });
  Assets.backgroundLoadBundle(["load-screen", "game-screen"]);

  const gameScreenAssets = await Assets.loadBundle("game-screen");
  const player = new Sprite(gameScreenAssets.planeSilver);
  app.stage.addChild(player);
  player.anchor.set(0.5);
  player.x = app.screen.width / 2;
  player.y = app.screen.height / 2;

  const textManager = new TextManager(app.stage, runtimeFlags.isDevMode);

  if (!initKeyboardControls()) {
    if (runtimeFlags.isDevMode) {
      console.error("キーボード制御の初期化に失敗しました。");
    }
  }

  let elapsedSeconds: number = 0; // 経過時間[秒]
  let score: number = 0;

  const spawnInterval = 1000; // 1秒(1000ms)ごとに敵出現
  let spawnTimer = spawnInterval; // 敵出現経過時間

  app.ticker.add((time) => {
    const deltaMS = time.deltaMS;
    const deltaSec = deltaMS / 1000;

    spawnTimer -= deltaMS;
    if (spawnTimer <= 0) {
      spawnTimer = spawnInterval;
      // 敵出現処理
      score += 1;
    }

    const playerSpeed = 180;
    let moveX = 0;
    let moveY = 0;

    if (keys.up) {
      moveY -= playerSpeed * deltaSec;
    }
    if (keys.down) {
      moveY += playerSpeed * deltaSec;
    }
    if (keys.left) {
      moveX -= playerSpeed * deltaSec;
    }
    if (keys.right) {
      moveX += playerSpeed * deltaSec;
    }
    player.x += moveX;
    player.y += moveY;

    textManager.updateText({
      score: score,
      playerX: Math.round(player.x),
      playerY: Math.round(player.y),
      deltaMS: Math.round(deltaMS),
      elapsedTime: elapsedSeconds,
    });

    elapsedSeconds += deltaSec;
  });
})();

/**
 * PixiJSアプリケーションを初期化し、設定済みのcanvasを返します。
 *
 * @param runtimeFlags 実行時フラグ（開発モードやモバイル判定など）
 * @returns {Promise<Application>} 初期化された PixiJS の Application インスタンス
 * @throws 初期化に失敗した場合、エラーをスローします
 */
async function createApplication(
  runtimeFlags: RuntimeFlags,
): Promise<Application> {
  try {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", gameConfig.canvas.id);
    const app = new Application();
    await app.init({
      canvas: canvas,
      width: gameConfig.canvas.width,
      height: gameConfig.canvas.height,
      background: gameConfig.canvas.backgroundColor,
    });
    return app;
  } catch (e) {
    if (runtimeFlags.isDevMode) {
      console.error("アプリケーション初期化に失敗:", e);
    }
    throw e;
  }
}
