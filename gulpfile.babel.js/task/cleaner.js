import del from 'del'

import config from './config'

const run = () => {
  return del([config.distDir])
}

export default {
  run
}
