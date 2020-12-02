import path from 'path'

import config from '~/config'

const IS_PROD = config.isProduction
const SRC = path.resolve(__dirname, config.path.js.srcDir)
const DEST = path.resolve(__dirname, config.path.js.dest)

const webpackConfig = {
  mode: IS_PROD ? 'production' : 'development',
  entry: {
    app: `${SRC}/index.js`,
  },
  output: {
    filename: "[name].js",
    path: DEST
  },
  devtool: IS_PROD ? false : 'source-map',
  watch: false,
}

export default webpackConfig
