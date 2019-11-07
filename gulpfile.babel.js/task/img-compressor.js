import gulp from 'gulp'
import gulpChanged from 'gulp-changed'
import gulpImagemin from 'gulp-imagemin'
import imageminPngquant from 'imagemin-pngquant'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminGifsicle from 'imagemin-gifsicle'
import imageminSvgo from 'imagemin-svgo'

import config from './config'
import server from './server'

const run = () => {
  return gulp.src([
    config.img.src
  ])
    .pipe(gulpChanged(config.img.dest))
    .pipe(gulpImagemin([
        imageminPngquant({
          quality: [0.65, 0.80],
          speed: 1,
          dithering: 1,
          strip: true,
        }),
        imageminMozjpeg({
          quality: 80,
          progressive: true
        }),
        imageminGifsicle({
          interlaced: false,
          optimizationLevel: 3,
          colors:180
        }),
        imageminSvgo()
      ], {
        verbose: true
      }
    ))
    .pipe(gulp.dest(config.img.dest))
}

const watch = (done) => {
  gulp.watch([
    config.img.src
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
