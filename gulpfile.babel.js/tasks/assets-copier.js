import gulp from 'gulp'

import config from '~/config'
import server from './server'
import watcher from './watcher'

function run() {
  console.log('assets-copier.run')
  return gulp.src(config.path.assets.src)
    .pipe(gulp.dest(config.path.assets.dest))
}

function watch(cb) {
  console.log('assets-copier.watch')
  watcher.run(
    [
      config.path.assets.src
    ],
    gulp.series(run, server.reload)
  )
  return cb()
}

export default {
  run,
  watch
}
