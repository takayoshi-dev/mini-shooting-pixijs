import { Application, Assets, Sprite, Text, TextStyle } from "pixi.js";
import { keys, initKeyboardControls } from "./keyControls";
import { gameConfig } from "./config/gameConfig";

const isDevMode = import.meta.env.MODE !== "production";

const app = new Application();

(async () => {
  await app.init({
    width: gameConfig.canvas.width,
    height: gameConfig.canvas.height,
    background: gameConfig.canvas.backgroundColor,
  });
  document.body.appendChild(app.canvas);

  const texture = await Assets.load("assets/plane_blue.png");
  const player = new Sprite(texture);
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

  let score = 0;
  const textScore = new Text({
    text: `スコア: ${score}`,
    style: defaultTextStyle,
    anchor: 0.0,
  });
  textScore.x = 10;
  textScore.y = 10;
  app.stage.addChild(textScore);

  const textDebugInfo = new Text({
    text: "",
    style: defaultTextStyle,
    anchor: 0.0,
  });
  textDebugInfo.x = app.screen.width / 2 + 100;
  textDebugInfo.y = 0;
  app.stage.addChild(textDebugInfo);

  if (!initKeyboardControls()) {
    if (isDevMode) {
      console.error("キーボード制御の初期化に失敗しました。");
    }
  }

  const spawnInterval = 1000; // 1秒(1000ms)ごとに敵出現
  let spawnTimer = spawnInterval; // 敵出現経過時間

  app.ticker.add((time) => {
    //player.rotation += 0.1 * time.deltaTime;
    const deltaMS = time.deltaMS;
    const deltaSec = deltaMS / 1000;

    spawnTimer -= deltaMS;
    if (spawnTimer < 0) {
      spawnTimer = spawnInterval;
      score += 1;
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

    textScore.text = `score: ${score}`;

    if (isDevMode) {
      const playerX = Math.round(player.x);
      const playerY = Math.round(player.y);
      textDebugInfo.text = `playerX: ${playerX}, playerY: ${playerY}, deltaMS: ${Math.round(deltaMS)}`;
    }
  });
})();
