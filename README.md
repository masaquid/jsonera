# JSONera

<div align="center">
  <img src="public/logo.svg" alt="JSONera Logo" width="120" height="120">
  
  <h3>エレガントなJSON整形・検証ツール</h3>
  
  <p>ガラスモーフィズムデザインを採用したモダンなJSON Formatter & Validator</p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=flat-square&logo=next.js)](https://nextjs.org)
  [![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)](https://reactjs.org)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com)
</div>

## ✨ 特徴

- 🎨 **ガラスモーフィズムUI** - backdrop-blurを使用した美しい半透明デザイン
- ⚡ **リアルタイム検証** - JSONの入力と同時に即座にバリデーション
- 🎯 **整形・圧縮** - JSONの整形（Pretty Print）と圧縮（Minify）に対応
- 📱 **レスポンシブデザイン** - モバイルからデスクトップまで最適表示
- 🌙 **ダーク/ライトテーマ** - テーマ切り替えとLocalStorage永続化
- 📁 **ファイルアップロード** - JSONファイルの直接アップロード対応
- 📋 **クリップボード機能** - ワンクリックでのコピー機能
- 🕒 **履歴管理** - 最後の10件のJSON入力を自動保存
- 🎭 **エレガントなタイポグラフィ** - Georgiaフォントによる洗練されたUI

## 🚀 クイックスタート

## 🏗️ 技術スタック

### フロントエンド
- **Next.js 15.3.3** - App Routerを使用したReactフレームワーク
- **React 19.0.0** - UIライブラリ
- **TypeScript** - 型安全な開発
- **Tailwind CSS v4** - ユーティリティファーストCSS

### デザイン
- **ガラスモーフィズム** - backdrop-blur効果による現代的なUI
- **Geistフォント** - Vercel製の美しいフォントファミリー
- **Georgiaフォント** - 見出しとブランディング用serif体

### 機能
- **LocalStorage** - テーマ設定と履歴の永続化
- **File API** - JSONファイルのアップロード
- **Clipboard API** - コピー機能

## 🎨 デザインシステム

### カラーパレット
- **プライマリ**: Blue (#3B82F6)
- **背景グラデーション**: 
  - ダーク: `from-blue-900 via-purple-900 to-pink-900`
  - ライト: `from-blue-100 via-purple-100 to-pink-100`

### ガラスモーフィズム効果
```css
backdrop-blur-xl bg-white/10 border border-white/20  /* ダークモード */
backdrop-blur-xl bg-black/5 border border-gray-300   /* ライトモード */
```

## 🔧 主要機能

### JSON操作
- **フォーマット**: 2スペースインデントでの整形
- **圧縮**: 空白・改行を除去したminify
- **検証**: リアルタイムエラー表示

### ユーザー体験
- **履歴機能**: 有効なJSON入力を最大10件まで保存
- **ファイルアップロード**: `.json`ファイルの直接読み込み
- **テーマ切り替え**: ダーク/ライトモードの切り替え
- **コピーフィードバック**: ✓ Copied!表示とアニメーション

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. Pull Requestを作成

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🙏 謝辞

- [Next.js](https://nextjs.org) - 素晴らしいReactフレームワーク
- [Tailwind CSS](https://tailwindcss.com) - 効率的なCSS開発
- [Vercel](https://vercel.com) - シームレスなデプロイメント
