import gulp from 'gulp'
import config from './config'
import server from './server'

const run = (done) => {
  return gulp.src(config.assets.src)
    .pipe(gulp.dest(config.assets.dest))
}

const watch = (done) => {
  gulp.watch([
    config.assets.src
  ], gulp.series(run, server.reload))
    .on('add', (path) => {
      console.log(`File ${path} was added`)
    })
    .on('change', (path) => {
      console.log(`File ${path} was changed`)
    })
    .on('unlink', (path) => {
      console.log(`File ${path} was removed`)
    })
  return done()
}

export default {
  run,
  watch
}
