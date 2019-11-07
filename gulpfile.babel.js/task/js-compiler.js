import gulp from 'gulp'
import gulpPlumber from 'gulp-plumber'
import gulpIf from 'gulp-if'
import gulpSourcemaps from 'gulp-sourcemaps'
import gulpBabel from 'gulp-babel'
import gulpUglify from 'gulp-uglify'
import gulpChangedInPlace from 'gulp-changed-in-place'
import gulpEslint from 'gulp-eslint'

import config from './config'
import server from './server'

const run = () => {
  return gulp.src([
    config.js.src,
    `!${config.js.src_}`
  ])
    .pipe(gulpPlumber())
    .pipe(gulpIf(!config.isRelease, gulpSourcemaps.init()))
    .pipe(gulpIf(!config.isRelease, gulpSourcemaps.identityMap()))
    .pipe(gulpBabel())
    .pipe(gulpUglify())
    .pipe(gulpIf(!config.isRelease, gulpSourcemaps.write('.')))
    .pipe(gulp.dest(config.js.dest))
}

const lint = () => {
  return gulp.src([
    config.js.src
  ])
    .pipe(gulpChangedInPlace({ firstPass: true }))
    .pipe(gulpEslint())
    .pipe(gulpEslint.format())
    .pipe(gulpIf(config.isRelease, gulpEslint.failAfterError()))
}

const watch = (done) => {
  gulp.watch([
    config.js.src
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
