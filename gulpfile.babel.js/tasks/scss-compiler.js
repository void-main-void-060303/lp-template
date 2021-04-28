import gulp from 'gulp'
import gulpPlumber from 'gulp-plumber'
import gulpSass from 'gulp-sass'
import nodeSassPackageImporter from 'node-sass-package-importer'
import gulpPostcss from 'gulp-postcss'
import cssMqpacker from 'css-mqpacker'
import cssDeclarationSorter from 'css-declaration-sorter'
import postcssAssets from 'postcss-assets'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import gulpStylelint from 'gulp-stylelint'

import config from '~/config'
import server from './server'
import watcher from './watcher'

function run() {
  console.log('scss-compiler.run')
  let result = gulp.src(
    [
      config.path.scss.src,
      `!${config.path.scss._src}`
    ],
    {
      sourcemaps: !config.isProduction
    }
  )
  // エラー検知
  result = result.pipe(gulpPlumber())
  // コンパイル
  result = result.pipe(gulpSass({
      // 標準形式で出力 [expanded, nested, compact, compressed]
      outputStyle: 'expanded',
      // import補助
      importer: nodeSassPackageImporter({
        extensions: ['.scss', '.css']
      })
    })
      // エラー検知
      .on('error', gulpSass.logError)
  )
  // CSS処理
  result = result.pipe(gulpPostcss([
    // メディアクエリ集約
    cssMqpacker,
    // ソート
    cssDeclarationSorter({
      order: 'smacss'
    }),
    // 画像処理
    postcssAssets,
    // ベンダープレフィックス追加
    autoprefixer()
  ]))
  if (config.isProduction) {
    result = result.pipe(gulpPostcss([
      // 圧縮
      cssnano({
        autoprefixer: false
      })
    ]))
  }
  return result.pipe(gulp.dest(config.path.scss.dest, {
    sourcemaps: !config.isProduction ? '.' : false
  }))
}

function lint() {
  console.log('scss-compiler.lint')
  return gulp.src(
    [
      config.path.scss.src
    ],
    {
      // 前回実行時以降に更新されたファイルが対象
      since: gulp.lastRun(lint)
    }
  )
    // lint
    .pipe(gulpStylelint({
      failAfterError: config.isProduction,
      reporters: [{
        formatter: 'verbose',
        console: true
      }],
      syntax: 'scss',
      fix: true
    }))
}

function watch(cb) {
  console.log('scss-compiler.watch')
  watcher.run(
    [
      config.path.scss.src
    ],
    gulp.series(lint, run, server.reload)
  )
  return cb()
}

export default {
  run,
  lint,
  watch
}
