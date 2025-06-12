import { Application, Assets, isMobile } from "pixi.js";
import type { Renderer } from "pixi.js";
import { keys, initKeyboardControls } from "./keyControls";
import { gameConfig } from "./config/gameConfig";
import { assetManifest } from "./manifest/assetManifest";
import { TextManager } from "./TextManager";
import type { RuntimeFlags } from "./types";
import { PlayerPlane } from "./PlayerPlane";
import { EnemyPlane } from "./EnemyPlane";

(async () => {
  const runtimeFlags: RuntimeFlags = {
    isDevMode: import.meta.env.DEV,
    isMobile: isMobile.any,
  };

  const app = await createApplication(runtimeFlags);
  document.body.appendChild(app.canvas);

  await Assets.init({ manifest: assetManifest });
  Assets.backgroundLoadBundle(["load-screen", "game-screen"]);

  if (!initKeyboardControls()) {
    if (runtimeFlags.isDevMode) {
      console.error("キーボード制御の初期化に失敗しました。");
    }
  }

  await startGame(app, runtimeFlags);
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
    const app = new Application();
    await app.init({
      width: gameConfig.canvas.width,
      height: gameConfig.canvas.height,
      background: gameConfig.canvas.backgroundColor,
    });
    app.canvas.setAttribute("id", gameConfig.canvas.id);
    return app;
  } catch (e) {
    if (runtimeFlags.isDevMode) {
      console.error("アプリケーション初期化に失敗:", e);
    }
    throw e;
  }
}

/**
 * ゲームのメイン処理
 *
 * アセットの読み込みや初期化処理を行い、ゲームループを開始する。
 * アセットのロードやスプライト生成中にエラーが発生した場合は、例外をスローする。
 *
 * @param app 初期化済みの PixiJS アプリケーションインスタンス
 * @param runtimeFlags 実行時フラグ（開発モード、モバイル判定など）
 * @throws 初期化中にエラーが発生した場合
 */
async function startGame(
  app: Application<Renderer>,
  runtimeFlags: RuntimeFlags,
) {
  try {
    const mainContainer = app.stage;
    const gameScreenAssets = await Assets.loadBundle("game-screen");
    const player = new PlayerPlane(
      app.screen.width / 2,
      app.screen.height / 2,
      180,
      gameScreenAssets.planeBlue,
    );
    mainContainer.addChild(player);

    const enemyPlanes = new Set<EnemyPlane>();

    const textManager = new TextManager(mainContainer, runtimeFlags.isDevMode);

    let elapsedSeconds: number = 0; // 経過時間[秒]
    const score: number = 0;

    const spawnInterval = 1000; // 1秒(1000ms)ごとに敵出現
    let spawnTimer = spawnInterval; // 敵出現経過時間

    const scoreSpeedRate = 1 / 500.0;
    app.ticker.add((time) => {
      const deltaMS = time.deltaMS;
      const deltaSec = deltaMS / 1000;

      spawnTimer -= deltaMS;
      if (spawnTimer <= 0) {
        spawnTimer = spawnInterval;
        // 敵出現処理
        const enemyPlane = new EnemyPlane(
          app.screen.width / 2,
          0,
          50,
          gameScreenAssets.planeBlue,
        );
        mainContainer.addChild(enemyPlane);
        enemyPlanes.add(enemyPlane);
      }

      if (keys.up) {
        player.moveUp(deltaMS, score * scoreSpeedRate);
      }
      if (keys.down) {
        player.moveDown(deltaMS, score * scoreSpeedRate);
      }
      if (keys.left) {
        player.moveLeft(deltaMS, score * scoreSpeedRate);
        /*
        player.angle -= 1;
        player.spriteAngle = player.angle;
        */
      }
      if (keys.right) {
        player.moveRight(deltaMS, score * scoreSpeedRate);
        /*
        player.angle += 1;
        player.spriteAngle = player.angle;
        */
      }

      const pendingRemovalEnemies = new Set<EnemyPlane>();
      enemyPlanes.forEach((enemy) => {
        enemy.moveUp(deltaMS, score * scoreSpeedRate);
        if (enemy.y > app.screen.height) {
          pendingRemovalEnemies.add(enemy);
        }
      });
      if (pendingRemovalEnemies.size > 0) {
        pendingRemovalEnemies.forEach((enemy) => {
          enemyPlanes.delete(enemy);
          enemy.releaseResources();
        });
        pendingRemovalEnemies.clear();
      }

      textManager.updateText({
        score: score,
        playerX: Math.round(player.x),
        playerY: Math.round(player.y),
        deltaMS: Math.round(deltaMS),
        elapsedTime: elapsedSeconds,
        angle: player.angle,
      });

      elapsedSeconds += deltaSec;
    });
  } catch (e) {
    if (runtimeFlags.isDevMode) {
      console.error("ゲーム開始処理中にエラーが発生しました:");
    }
    throw e;
  }
}
