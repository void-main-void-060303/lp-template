import browserSync from 'browser-sync'

import config from './config'

const server = browserSync.create()

const reload = (done) => {
  server.reload()
  return done()
}

const serve = (done) => {
  server.init({
    server: {
      baseDir: config.distDir
    }
  })
  return done()
}

export default {
  reload,
  serve
}
