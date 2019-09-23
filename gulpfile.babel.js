'use strict'

import gulp from 'gulp'
import gulpEjs from 'gulp-ejs'
import gulpReplace from 'gulp-replace'
import gulpPlumber from 'gulp-plumber'
import gulpSass from 'gulp-sass'
import gulpSourcemaps from 'gulp-sourcemaps'
import gulpPostcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssDeclarationSorter from 'css-declaration-sorter'
import cssMqpacker from 'css-mqpacker'
import cssnano from 'cssnano'
import gulpUglify from 'gulp-uglify'
import gulpChanged from 'gulp-changed'
import gulpImagemin from 'gulp-imagemin'
import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'
import imageminGifsicle from 'imagemin-gifsicle'

const dirPaths = {
	src: './src',
	dist: './dist',
	html: '/',
	ejs: '/ejs',
	css: '/css',
	scss: '/scss',
	js: '/js',
	img: '/img'
}
const filePaths = {
	ejs: '/**/*.ejs',
	ejs_: '/**/_*.ejs',
	scss: '/**/*.scss',
	scss_: '/**/_*.scss',
	js: '/**/*.js',
	img: '/**/*.+(jpg|jpeg|png|gif|svg)'
}

const compileHtml = (done) => {
	return gulp.src([
			`${dirPaths.src}${dirPaths.ejs}${filePaths.ejs}`,
			`!${dirPaths.src}${dirPaths.ejs}${filePaths.ejs_}`
		])
		.pipe(gulpPlumber())
		.pipe(gulpEjs({}, {}, {ext: '.html'}))
		.pipe(gulpReplace(/^[ \t]*\r?\n/gm, ''))
		.pipe(gulp.dest(`${dirPaths.dist}${dirPaths.html}`))
}

const compileCss = (done) => {
	return gulp.src([
			`${dirPaths.src}${dirPaths.scss}${filePaths.scss}`,
			`!${dirPaths.src}${dirPaths.scss}${filePaths.scss_}`
		])
		.pipe(gulpPlumber())
		.pipe(gulpSourcemaps.init())
		.pipe(gulpSourcemaps.identityMap())
		.pipe(
			gulpSass({ outputStyle: 'compressed' }).on('error', gulpSass.logError)
		)
		.pipe(gulpPostcss([
			autoprefixer({
				cascade: false
			}),
			cssDeclarationSorter({
				order: 'smacss'
			}),
			cssMqpacker(),
			cssnano({ autoprefixer: false })
		]))
		.pipe(gulp.dest(`${dirPaths.dist}${dirPaths.css}`))
		.pipe(gulpSourcemaps.write('.'))
}

const compileJs = (done) => {
	return gulp.src(`${dirPaths.src}${dirPaths.js}${filePaths.js}`)
	.pipe(gulpPlumber())
	.pipe(gulpSourcemaps.init())
	.pipe(gulpSourcemaps.identityMap())
	.pipe(gulpUglify())
	.pipe(gulp.dest(`${dirPaths.dist}${dirPaths.js}`))
	.pipe(gulpSourcemaps.write('.'))

	console.log('JS compile success !')
	done()
}

const compileImg = (done) => {
	return gulp.src([
			`${dirPaths.src}${dirPaths.img}${filePaths.img}`,
		])
		.pipe(gulpChanged(`${dirPaths.dist}${dirPaths.img}`))
		.pipe(gulpImagemin([
			imageminMozjpeg({
						quality: '65-80',
						speed: 1,
						floyd: 0,
					}),
					imageminPngquant({
						quality: 80,
						progressive: true
					}),
					imageminGifsicle({
						interlaced: false,
						optimizationLevel: 3,
						colors:180
					}),
					gulpImagemin.svgo(),
					gulpImagemin.optipng(),
					gulpImagemin.gifsicle()
				], {
					verbose: true
				}
		))
		.pipe(gulp.dest(`${dirPaths.dist}${dirPaths.img}`));
}

gulp.task('compile',
  gulp.series(
		gulp.parallel(compileHtml, compileCss, compileJs, compileImg),
		(done) => {
			console.log('Compile success !!')
			done()
		}
	)
)

const watchHtml = (done) => {
	gulp.watch([
		`${dirPaths.src}${dirPaths.ejs}${filePaths.ejs}`
	], compileHtml)
	.on('change',(event) => {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	})
	done()
}

const watchCss = (done) => {
	gulp.watch([
		`${dirPaths.src}${dirPaths.scss}${filePaths.scss}`
	], compileCss)
	.on('change',(event) => {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	})
	done()
}

const watchJs = (done) => {
	gulp.watch([
		`${dirPaths.src}${dirPaths.js}${filePaths.js}`
	], compileJs)
	.on('change',(event) => {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	})
	done()
}

const watchImg = (done) => {
	gulp.watch([
		`${dirPaths.src}${dirPaths.img}${filePaths.img}`
	], compileImg)
	.on('change',(event) => {
		console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
	})
	done()
}

gulp.task('watch',
  gulp.series(
		gulp.parallel(watchHtml, watchCss, watchJs, watchImg),
		(done) => {
			console.log('Watch files.')
			done()
		}
	)
)

gulp.task('default', gulp.series('compile', 'watch', (done) => {
	console.log('All success !!!')
	done()
}))