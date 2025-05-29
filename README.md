## 概要

PixiJS + TypeScript + Vite によって構築された、ブラウザ向けの2Dシューティングゲームです。

## 🎮 デモ

GitHub Pages 上でプレイできます。  
📌 [https://takayoshi-dev.github.io/mini-shooting-pixijs/](https://takayoshi-dev.github.io/mini-shooting-pixijs/)

## 📁 プロジェクト構成

| 項目                 | 内容                                                   |
| -------------------- | ------------------------------------------------------ |
| OS                   | Windows10                                              |
| エディタ             | Visual Studio Code                                     |
| 使用言語             | TypeScript                                             |
| 描画ライブラリ       | PixiJS（WebGLベースの2Dレンダリング）                  |
| ビルドツール         | Vite（開発サーバーとビルド機能）                       |
| 単体テスト           | Jest + ts-jest                                         |
| ドキュメント生成     | TypeDoc（JSDocコメントからHTMLドキュメントを自動生成） |
| コードチェック・整形 | ESLint（構文チェック） + Prettier（自動フォーマット）  |
| 公開先               | GitHub Pages（GitHub Actions による自動デプロイ）      |

## 🚀 セットアップ

```bash

# パッケージのインストール
npm install

# コード整形
npm run fix-format

# 型チェック
npm run type-check

# 単体テスト実行
npm run unit-test

# ビルド
npm run build

# ドキュメント生成
npm run generate-docs

# 開発用サーバー起動
npm run dev
```
