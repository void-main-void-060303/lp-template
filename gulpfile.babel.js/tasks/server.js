import browserSync from 'browser-sync'

import config from '~/config'

const server = browserSync.create()

function reload(cb) {
  console.log('server.reload')
  //server.reload()
  return cb()
}

function serve(cb) {
  console.log('server.serve')
  server.init({
    server: {
      baseDir: config.path.distDir
    },
    port: 3000,
    open: false,
    //ghostMode: false

  })
  return cb()
}

export default {
  reload,
  serve
}
