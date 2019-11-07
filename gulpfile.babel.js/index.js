'use strict'

import gulp from 'gulp'
import cleaner from './task/cleaner'
import ejsCompiler from './task/ejs-compiler'
import scssCompiler from './task/scss-compiler'
import jsCompiler from './task/js-compiler'
import imgCompressor from './task/img-compressor'
import assetsCopier from './task/assets-copier'
import server from './task/server'

const clean = gulp.series(
  cleaner.run,
  (done) => {
    console.log('Clean files.')
    done()
  }
)

export const lint = gulp.series(
  gulp.parallel(
    ejsCompiler.lint,
    scssCompiler.lint,
    jsCompiler.lint
  ),
  (done) => {
    console.log('Lint success !!!')
    done()
  }
)

const compile = gulp.series(
  gulp.parallel(
    ejsCompiler.run,
    scssCompiler.run,
    jsCompiler.run,
    imgCompressor.run,
    assetsCopier.run
  ),
  (done) => {
    console.log('Compile success !!!')
    done()
  }
)

const watch = gulp.series(
  gulp.parallel(
    ejsCompiler.watch,
    scssCompiler.watch,
    jsCompiler.watch,
    imgCompressor.watch,
    assetsCopier.watch
  ),
  (done) => {
    console.log('Watch files.')
    done()
  }
)

export default gulp.series(
  compile,
  server.serve,
  watch
)

export const build = gulp.series(
  clean,
  lint,
  compile,
  (done) => {
    console.log('Build success !!!')
    done()
  }
)
