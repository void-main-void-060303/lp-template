import gulp from 'gulp'

import cleaner from './tasks/cleaner'
import ejsCompiler from './tasks/ejs-compiler'
import scssCompiler from './tasks/scss-compiler'
import jsCompiler from './tasks/js-compiler'
import imgCompressor from './tasks/img-compressor'
import assetsCopier from './tasks/assets-copier'
import server from './tasks/server'

export const clean = gulp.series(
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

export const compile = gulp.series(
  gulp.parallel(
    ejsCompiler.run,
    scssCompiler.run,
    jsCompiler.run,
    imgCompressor.run,
  ),
  assetsCopier.run,
  (done) => {
    console.log('Compile success !!!')
    done()
  }
)

export const watch = gulp.series(
  gulp.parallel(
    ejsCompiler.watch,
    scssCompiler.watch,
    jsCompiler.watch,
    imgCompressor.watch,
    assetsCopier.watch,
  ),
  (done) => {
    console.log('Watching started.')
    done()
  }
)

export const dev = gulp.series(
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
