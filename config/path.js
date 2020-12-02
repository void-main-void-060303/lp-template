const dir = {
  src: './src',
  dist: './dist',
  html: '',
  ejs: '/ejs',
  css: '/css',
  scss: '/scss',
  js: '/js',
  img: '/img',
  assets: '/assets',
  distAssets: '/assets',
}
const file = {
  ejs: '/**/*.ejs',
  _ejs: '/**/_*.ejs',
  scss: '/**/*.scss',
  _scss: '/**/_*.scss',
  js: '/**/*.js',
  _js: '/**/_*.js',
  img: '/**/*.+(jpg|jpeg|png|gif|svg)',
  map: '/**/*.map',
  all: '/**/*',
}

const ejs = {
  srcDir: `${dir.src}${dir.ejs}`,
  src: `${dir.src}${dir.ejs}${file.ejs}`,
  _src: `${dir.src}${dir.ejs}${file._ejs}`,
  dest: `${dir.dist}${dir.html}`
}

const scss = {
  srcDir: `${dir.src}${dir.scss}`,
  src: `${dir.src}${dir.scss}${file.scss}`,
  _src: `${dir.src}${dir.scss}${file._scss}`,
  dest: `${dir.dist}${dir.distAssets}${dir.css}`
}

const js = {
  srcDir: `${dir.src}${dir.js}`,
  src: `${dir.src}${dir.js}${file.js}`,
  _src: `${dir.src}${dir.js}${file._js}`,
  dest: `${dir.dist}${dir.distAssets}${dir.js}`
}

const img = {
  srcDir: `${dir.src}${dir.img}`,
  src: `${dir.src}${dir.img}${file.img}`,
  dest: `${dir.dist}${dir.distAssets}${dir.img}`
}

const assets = {
  srcDir: `${dir.src}${dir.assets}`,
  src: `${dir.src}${dir.assets}${file.all}`,
  dest: `${dir.dist}${dir.distAssets}`
}

export default {
  dir,
  file,
  distDir: dir.dist,
  distFiles: `${dir.dist}${file.all}`,
  ejs,
  scss,
  js,
  img,
  assets,
}
