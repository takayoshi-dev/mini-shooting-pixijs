import { Application, Assets, isMobile, Graphics } from "pixi.js";
import type { Renderer } from "pixi.js";
import { keys, initKeyboardControls } from "@/keyControls";
import { gameConfig } from "@/config/gameConfig";
import { assetManifest } from "@/manifest/assetManifest";
import { TextManager } from "@/TextManager";
import type { RuntimeFlags } from "@/types";
import { PlayerPlane } from "@/PlayerPlane";
import { EnemyPlane } from "@/EnemyPlane";
import { LayerManager } from "@/LayerManager";
import { RandomUtils } from "@/utils";

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
    const layerManager = new LayerManager(mainContainer);

    const gameScreenAssets = await Assets.loadBundle("game-screen");
    const player = new PlayerPlane(
      app.screen.width * 0.5,
      app.screen.height * 0.8,
      180,
      gameScreenAssets.planeBlue,
    );
    layerManager.addChild(player);

    const enemyPlanes = new Set<EnemyPlane>();

    const textManager = new TextManager(mainContainer, runtimeFlags.isDevMode);

    let elapsedSeconds: number = 0; // 経過時間[秒]
    const score: number = 0;

    const initSpawnInterval = 1000; // 1秒後(1000ms)に敵出現
    let spawnTimer = initSpawnInterval; // 敵出現経過時間

    if (gameConfig.playfield.walls.visible) {
      mainContainer.addChild(drawBoundaryLines(app));
    }

    type Boundary = {
      LeftX: number;
      RightX: number;
      TopY: number;
      BottomY: number;
    };
    const boundary: Boundary = {
      LeftX: gameConfig.playfield.margin.left,
      RightX: app.screen.width - gameConfig.playfield.margin.right,
      TopY: gameConfig.playfield.margin.top,
      BottomY: app.screen.height - gameConfig.playfield.margin.bottom,
    };

    let oldX = 0;
    const scoreSpeedRate = 1 / 500.0;
    app.ticker.add((time) => {
      const deltaMS = time.deltaMS;
      const deltaSec = deltaMS / 1000;

      spawnTimer -= deltaMS;
      if (spawnTimer <= 0) {
        //spawnTimer = RandomUtils.getRand(200, 1400);
        spawnTimer = 100;
        // 敵出現処理
        let nowX = RandomUtils.getRand(boundary.LeftX, boundary.RightX);

        let enemyRadius = 10;
        if (oldX > 0) {
          enemyRadius += Math.abs(nowX - oldX) / 30;
        }

        if (boundary.LeftX > nowX - enemyRadius) {
          nowX = boundary.LeftX + enemyRadius;
        }
        if (boundary.RightX < nowX + enemyRadius) {
          nowX = boundary.RightX - enemyRadius;
        }

        const enemyPlane = new EnemyPlane(
          nowX,
          gameConfig.playfield.margin.top - enemyRadius,
          50,
          enemyRadius,
        );
        oldX = nowX;
        layerManager.addChild(enemyPlane);
        enemyPlanes.add(enemyPlane);
      }

      if (keys.up) {
        player.moveUp(deltaMS, score * scoreSpeedRate);
        const boundaryTopY = boundary.TopY + player.height / 2;
        if (boundaryTopY > player.y) {
          player.y = boundaryTopY;
        }
      }
      if (keys.down) {
        player.moveDown(deltaMS, score * scoreSpeedRate);
        const boundaryBottomY = boundary.BottomY - player.height / 2;
        if (boundaryBottomY < player.y) {
          player.y = boundaryBottomY;
        }
      }
      if (keys.left) {
        player.moveLeft(deltaMS, score * scoreSpeedRate);
        const boundaryLeftX = boundary.LeftX + player.width / 2;
        if (boundaryLeftX > player.x) {
          player.x = boundaryLeftX;
        }
      }
      if (keys.right) {
        player.moveRight(deltaMS, score * scoreSpeedRate);
        const boundaryRightX = boundary.RightX - player.width / 2;
        if (boundaryRightX < player.x) {
          player.x = boundaryRightX;
        }
      }

      const pendingRemovalEnemies = new Set<EnemyPlane>();
      enemyPlanes.forEach((enemy) => {
        enemy.moveUp(deltaMS, score * scoreSpeedRate);
        const boundaryBottomY =
          app.screen.height - gameConfig.playfield.margin.bottom;
        const enemyY = enemy.y - enemy.height / 2;
        if (enemyY > boundaryBottomY) {
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

function drawBoundaryLines(app: Application): Graphics {
  const marginWidth =
    gameConfig.playfield.margin.right + gameConfig.playfield.margin.left;
  const marginHeight =
    gameConfig.playfield.margin.top + gameConfig.playfield.margin.bottom;
  const boundaryWall = new Graphics()
    .rect(
      gameConfig.playfield.margin.left,
      gameConfig.playfield.margin.top,
      app.screen.width - marginWidth,
      app.screen.height - marginHeight,
    )
    .stroke({
      color: gameConfig.playfield.walls.color,
      pixelLine: gameConfig.playfield.walls.pixelLine,
    });
  return boundaryWall;
}
