# lp-template
LP用テンプレート

## 概要
LPの制作を楽にするためのテンプレートです。

## 設定ファイル
### config/index.js
プロジェクト全体の設定ファイルです。

### config/path.js
プロジェクト全体のパス設定ファイルです。

### src/ejs/_config.js
ejsに関する設定ファイルです。

## 環境構築手順

### 開発環境
```
git clone このプロジェクト
yarn install
yarn dev
```

### 検証環境
```
git clone このプロジェクト
yarn install
yarn build
cp -R dist/* パブリッシュルートディレクトリ
```


## 使用技術
- [node](https://nodejs.org/ja/)
- [yarn](https://classic.yarnpkg.com/ja/)
- [gulp](https://gulpjs.com/)
- [ejs](https://ejs.co/)
- scss
- [ress.css](https://github.com/filipelinhares/ress)
- [webpack](https://webpack.js.org/)
- [jquery](https://jquery.com/)
- [google fonts](https://fonts.google.com/selection?query=noto+sans&selection.family=Noto+Sans+JP:400,700|Noto+Serif+JP:400,700)
- [yaku han jp](https://yakuhanjp.qranoko.jp/)
