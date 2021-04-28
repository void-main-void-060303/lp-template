import gulp from 'gulp'
import gulpChanged from 'gulp-changed'
import gulpImagemin from 'gulp-imagemin'

import config from '~/config'
import server from './server'
import watcher from './watcher'

function run() {
  console.log('img-compressor.run')
  let result = gulp.src(
    [
      config.path.img.src
    ]
  )
  result = result.pipe(gulpChanged(config.path.img.dest))
  result = result.pipe(gulpImagemin(
    [
      gulpImagemin.gifsicle({
        interlaced: false,
        optimizationLevel: 3,
        colors: 180
      }),
      gulpImagemin.mozjpeg({
        quality: 80,
        progressive: true
      }),
      gulpImagemin.optipng({
        quality: [ 0.65, 0.80 ],
        speed: 1,
        dithering: 1,
        strip: true
      }),
      gulpImagemin.svgo({
        plugins: [
          {
            removeViewBox: true
          },
          {
            cleanupIDs: false
          }
        ]
      })
    ],
    {
      verbose: true
    }
  ))
  return result.pipe(gulp.dest(config.path.img.dest))
}

const watch = (cb) => {
  console.log('img-compressor.watch')
  watcher.run(
    [
      config.path.img.src
    ],
    gulp.series(run, server.reload)
  )
  return cb()
}

export default {
  run,
  watch
}
