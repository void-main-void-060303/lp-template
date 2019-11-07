import gulp from 'gulp'
import gulpPlumber from 'gulp-plumber'
import gulpIf from 'gulp-if'
import gulpSourcemaps from 'gulp-sourcemaps'
import gulpSass from 'gulp-sass'
import nodeSassPackageImporter from 'node-sass-package-importer'
import gulpPostcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssDeclarationSorter from 'css-declaration-sorter'
import cssMqpacker from 'css-mqpacker'
import cssnano from 'cssnano'
import gulpChangedInPlace from 'gulp-changed-in-place'
import gulpStylelint from 'gulp-stylelint'

import config from './config'
import server from './server'

const run = () => {
  return gulp.src([
    config.scss.src,
    `!${config.scss.src_}`
  ])
    .pipe(gulpPlumber())
    .pipe(gulpIf(!config.isRelease, gulpSourcemaps.init()))
    .pipe(gulpIf(!config.isRelease, gulpSourcemaps.identityMap()))
    .pipe(
      gulpSass({
        outputStyle: 'compressed',
        importer: nodeSassPackageImporter({
          extensions: ['.scss', '.css']
        })
      }).on('error', gulpSass.logError)
    )
    .pipe(gulpPostcss([
      autoprefixer({
        cascade: false
      }),
      cssDeclarationSorter({
        order: 'smacss'
      }),
      cssMqpacker(),
      cssnano({ autoprefixer: false })
    ]))
    .pipe(gulpIf(!config.isRelease, gulpSourcemaps.write('.')))
    .pipe(gulp.dest(config.scss.dest))
}

const lint = () => {
  return gulp.src([
    config.scss.src
  ])
    .pipe(gulpChangedInPlace({ firstPass: true }))
    .pipe(gulpStylelint({
      failAfterError: config.isRelease,
      reporters: [{ formatter: 'verbose', console: true }],
      syntax: 'scss'
    }))
}

const watch = (done) => {
  gulp.watch([
    config.scss.src
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
