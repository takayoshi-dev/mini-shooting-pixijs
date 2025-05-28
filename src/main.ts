import { Application, Assets, Sprite } from "pixi.js";
import { keys, initKeyboardControls } from "./keyControls";

(async () => {
  const app = new Application();
  await app.init({
    width: 640,
    height: 480,
    background: "#1099bb",
  });
  document.body.appendChild(app.canvas);
  const texture = await Assets.load("assets/plane_blue.png");
  const player = new Sprite(texture);
  app.stage.addChild(player);
  player.anchor.set(0.5);
  player.x = app.screen.width / 2;
  player.y = app.screen.height / 2;

  if (!initKeyboardControls()) {
    if (import.meta.env.Mode !== "production") {
      console.error("キーボード制御の初期化に失敗しました。");
    }
  }

  app.ticker.add((time) => {
    //player.rotation += 0.1 * time.deltaTime;
    const deltaSec = time.deltaMS / 1000;

    const playerSpeed = 180;
    let moveX = 0;
    let moveY = 0;

    if (keys.up) moveY -= playerSpeed * deltaSec;
    if (keys.down) moveY += playerSpeed * deltaSec;
    if (keys.left) moveX -= playerSpeed * deltaSec;
    if (keys.right) moveX += playerSpeed * deltaSec;
    player.x += moveX;
    player.y += moveY;
  });
})();
