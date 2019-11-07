import gulp from 'gulp'
import gulpPlumber from 'gulp-plumber'
import gulpEjs from 'gulp-ejs'
import gulpRename from 'gulp-rename'
import gulpReplace from 'gulp-replace'

import config from './config'
import server from './server'

const run = () => {
  return gulp.src([
    config.ejs.src,
    `!${config.ejs.src_}`
  ])
    .pipe(gulpPlumber())
    .pipe(gulpEjs())
    .pipe(gulpRename({ extname: '.html' }))
    .pipe(gulpReplace(/^[ \t]*\r?\n/gm, ''))
    .pipe(gulp.dest(config.ejs.dest))
}

const lint = (done) => {
  return done()
}

const watch = (done) => {
  gulp.watch([
    config.ejs.src
  ], gulp.series(lint, run, server.reload))
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
  lint,
  watch
}
