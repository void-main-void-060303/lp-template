import gulp from 'gulp'
import gulpPlumber from 'gulp-plumber'
import gulpEjs from 'gulp-ejs'
import gulpRename from 'gulp-rename'
import gulHtmlmin from 'gulp-htmlmin'

import config from '~/config'
import server from './server'
import watcher from './watcher'

function run() {
  console.log('ejs-compiler.run')
  let result = gulp.src([
    config.path.ejs.src,
    `!${config.path.ejs._src}`
  ])
  // エラー検知
  result = result.pipe(gulpPlumber())
  // コンパイル
  result = result.pipe(gulpEjs(config))
  // 拡張子変換
  result = result.pipe(gulpRename({ extname: '.html' }))
  // 圧縮
  if (config.isProduction) {
    result = result.pipe(gulHtmlmin({
      // 余白除去
      collapseWhitespace: true,
      // コメント除去
      removeComments: true
    }))
  }
  // 出力
  return result.pipe(gulp.dest(config.path.ejs.dest))
}

function lint(cb) {
  console.log('ejs-compiler.lint')
  return cb()
}

function watch(cb) {
  console.log('ejs-compiler.watch')
  watcher.run(
    [
      config.path.ejs.src
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
