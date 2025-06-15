# CLAUDE.md

このファイルは、このリポジトリでコードを作業する際にClaude Code（claude.ai/code）にガイダンスを提供します。

## プロジェクト概要

JSONeraは、ガラスモーフィズムUIデザインを使用したJSON整形・検証のためのNext.js 15ウェブアプリケーションです。リアルタイムJSON検証、整形、圧縮、履歴管理、ダーク/ライトテーマサポートを提供します。

## 開発コマンド

```bash
# Turbopackで開発サーバーを起動
npm run dev

# 本番用ビルド
npm run build

# 本番サーバー起動
npm start

# ESLint実行
npm run lint

# TypeScript型チェック（npmスクリプトなし）
npx tsc --noEmit
```

## アーキテクチャ

### 技術スタック
- **Next.js 15.3.3** with App Router
- **React 19.0.0** with TypeScript
- **Tailwind CSS v4** でスタイリング
- **ガラスモーフィズムデザイン** with backdrop blur effects

### 主要ファイル
- `src/app/page.tsx` - 全てのコア機能を持つメインJSONフォーマッターコンポーネント
- `src/app/layout.tsx` - Geistフォント設定のルートレイアウト
- `src/app/globals.css` - グローバルスタイルとTailwindインポート
- `next.config.ts` - Next.js設定
- `tailwindcss` - Tailwind CSS v4設定

### コンポーネントアーキテクチャ
アプリは`page.tsx`に全機能を持つシングルページアプリケーションとして構築：
- React hooksを使用した状態管理
- 履歴とテーマのLocalStorage永続化
- リアルタイムJSON検証と整形
- レスポンシブデザインのガラスモーフィズムUI

### スタイリングシステム
- PostCSS統合のTailwind CSS v4
- `backdrop-blur-xl`と半透明背景を使用したガラスモーフィズム効果
- グラデーション背景のダーク/ライトテーマシステム
- `lg:grid-cols-2`レイアウトのレスポンシブデザイン

### 状態管理
- `useState`を使用したコンポーネントレベルの状態
- 永続化のためのLocalStorage：
  - `json-formatter-history` - 最後の10個の有効なJSON入力を保存
  - `json-formatter-theme` - ダーク/ライトテーマ設定を保存
- 外部状態管理ライブラリなし

### TypeScript設定
- 厳密モード有効
- パスエイリアス：`@/*` は `./src/*` にマップ
- Next.jsプラグイン統合のES2017ターゲット

### Vercelでホスティングする際の注意
Vercelでのビルドは型定義などが厳密なので
最終コミット前に必ずESlintとtype-checkを行うこと

