import { Application, Assets, Sprite, Text, TextStyle } from "pixi.js";
import { keys, initKeyboardControls } from "./keyControls";
import { gameConfig } from "./config/gameConfig";
import { runtimeFlags } from "./runtimeFlags";
import { assetManifest } from "./manifest/assetManifest";

(async () => {
  const app = await createApplication();
  document.body.appendChild(app.canvas);

  await Assets.init({ manifest: assetManifest });
  Assets.backgroundLoadBundle(["load-screen", "game-screen"]);

  const gameScreenAssets = await Assets.loadBundle("game-screen");
  const player = new Sprite(gameScreenAssets.planeSilver);
  app.stage.addChild(player);
  player.anchor.set(0.5);
  player.x = app.screen.width / 2;
  player.y = app.screen.height / 2;

  const defaultTextStyle = new TextStyle({
    fontFamily: "Arial",
    fontSize: 12,
    fill: 0xffffff,
    align: "center",
  });

  let elapsedSeconds: number = 0; // 経過時間[秒]
  const textElapsedSec = new Text({
    text: `TIME: ${elapsedSeconds.toFixed(2)}`,
    style: defaultTextStyle,
    anchor: 0.0,
  });
  textElapsedSec.x = 10;
  textElapsedSec.y = 0;
  app.stage.addChild(textElapsedSec);

  const score: number = 0;
  const textScore = new Text({
    text: `SCORE: ${score}`,
    style: defaultTextStyle,
    anchor: 0.0,
  });
  textScore.x = 10;
  textScore.y = 20;
  app.stage.addChild(textScore);

  const textDebugInfo1 = new Text({
    text: "",
    style: defaultTextStyle,
    anchor: 0.0,
  });
  textDebugInfo1.x = app.screen.width / 2 + 100;
  textDebugInfo1.y = 0;
  app.stage.addChild(textDebugInfo1);

  const textDebugInfo2 = new Text({
    text: "",
    style: defaultTextStyle,
    anchor: 0.0,
  });
  textDebugInfo2.x = 0;
  textDebugInfo2.y = app.screen.height - 50;
  app.stage.addChild(textDebugInfo2);

  if (!initKeyboardControls()) {
    if (runtimeFlags.isDevMode) {
      console.error("キーボード制御の初期化に失敗しました。");
    }
  }

  const spawnInterval = 1000; // 1秒(1000ms)ごとに敵出現
  let spawnTimer = spawnInterval; // 敵出現経過時間

  app.ticker.add((time) => {
    const deltaMS = time.deltaMS;
    const deltaSec = deltaMS / 1000;

    spawnTimer -= deltaMS;
    if (spawnTimer < 0) {
      spawnTimer = spawnInterval;
      // 敵出現処理
    }

    const playerSpeed = 180;
    let moveX = 0;
    let moveY = 0;

    if (keys.up) moveY -= playerSpeed * deltaSec;
    if (keys.down) moveY += playerSpeed * deltaSec;
    if (keys.left) moveX -= playerSpeed * deltaSec;
    if (keys.right) moveX += playerSpeed * deltaSec;
    player.x += moveX;
    player.y += moveY;

    textElapsedSec.text = `TIME: ${elapsedSeconds.toFixed(2)}`;
    textScore.text = `SCORE: ${score}`;

    if (runtimeFlags.isDevMode) {
      const playerX = Math.round(player.x);
      const playerY = Math.round(player.y);
      textDebugInfo1.text = `playerX: ${playerX}, playerY: ${playerY}, deltaMS: ${Math.round(deltaMS)}`;
      textDebugInfo2.text = ``;
    }

    elapsedSeconds += deltaSec;
  });
})();

/**
 * PixiJSアプリケーションを初期化し、設定済みのcanvasを返します。
 *
 * @returns {Promise<Application>} 初期化された PixiJS の Application インスタンス
 * @throws 初期化に失敗した場合、エラーをスローします
 */
async function createApplication(): Promise<Application> {
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
