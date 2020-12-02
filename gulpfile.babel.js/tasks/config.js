const DIR = {
  src: './src',
  dist: './dist',
  html: '',
  ejs: '/ejs',
  css: '/css',
  scss: '/scss',
  js: '/js',
  img: '/img',
  assets: '/assets',
}
const FILE = {
  ejs: '/**/*.ejs',
  ejs_: '/**/_*.ejs',
  scss: '/**/*.scss',
  scss_: '/**/_*.scss',
  js: '/**/*.js',
  js_: '/**/_*.js',
  img: '/**/*.+(jpg|jpeg|png|gif|svg)',
  map: '/**/*.map',
  all: '/**/*',
}

const ejs = {
  src: `${DIR.src}${DIR.ejs}${FILE.ejs}`,
  src_: `${DIR.src}${DIR.ejs}${FILE.ejs_}`,
  dest: `${DIR.dist}${DIR.html}`
}

const scss = {
  src: `${DIR.src}${DIR.scss}${FILE.scss}`,
  src_: `${DIR.src}${DIR.scss}${FILE.scss_}`,
  dest: `${DIR.dist}${DIR.assets}${DIR.css}`
}

const js = {
  src: `${DIR.src}${DIR.js}${FILE.js}`,
  src_: `${DIR.src}${DIR.js}${FILE.js_}`,
  dest: `${DIR.dist}${DIR.assets}${DIR.js}`
}

const img = {
  src: `${DIR.src}${DIR.img}${FILE.img}`,
  dest: `${DIR.dist}${DIR.assets}${DIR.img}`
}

const assets = {
  src: `${DIR.src}${DIR.assets}${FILE.all}`,
  dest: `${DIR.dist}${DIR.assets}`
}

const isRelease = process.env.NODE_ENV === 'production'

export default {
  distDir: DIR.dist,
  ejs,
  scss,
  js,
  img,
  assets,
  isRelease
}
