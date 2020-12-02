import gulp from 'gulp'
import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import gulpEslint from 'gulp-eslint'

import config from '~/config'
import webpackConfig from '~/webpack.config'
import server from './server'
import watcher from './watcher'

function run() {
  console.log('js-compiler.run')
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest(config.path.js.dest))
}

function lint() {
  console.log('js-compiler.lint')
  let result = gulp.src(
    [
      config.path.js.src
    ],
    {
      // 前回実行時以降に更新されたファイルが対象
      since: gulp.lastRun(lint)
    }
  )
  result = result.pipe(gulpEslint())
  result = result.pipe(gulpEslint.format())
  if (config.isProduction) {
    result = result.pipe(gulpEslint.failAfterError())
  }
  return result
}

function watch(cb) {
  console.log('js-compiler.watch')
  watcher.run(
    [
      config.path.js.src,
    ],
    gulp.series(lint, run, server.reload)
  )
  cb()
}

export default {
  run,
  lint,
  watch
}
