/**
 * ゲーム実行時の環境フラグを定義するインターフェース
 *
 * 主に開発モードの判定や、モバイル端末での動作可否に関するフラグを保持します。
 * `main.ts` などのエントリーポイントで生成し、各クラスに注入して使用します。
 */
export interface RuntimeFlags {
  /** 開発モードかどうか */
  isDevMode: boolean;

  /** モバイル端末かどうか */
  isMobile: boolean;
}
