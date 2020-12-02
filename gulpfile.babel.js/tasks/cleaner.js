import del from 'del'

import config from '~/config'

function run() {
  console.log('cleaner.run')
  return del([
    config.path.distFiles
  ])
}

export default {
  run
}
