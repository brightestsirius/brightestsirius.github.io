const {src, dest, series, watch, parallel} = require('gulp'),
	fileInclude = require('gulp-file-include'),
	sass = require('gulp-dart-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	cleanCss = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	svgSprite = require('gulp-svg-sprite'),
	ttf2wof = require('gulp-ttf2woff'),
	ttf2wof2 = require('gulp-ttf2woff2'),
	babel = require('gulp-babel'),
	webpack = require('webpack-stream'),
	terser = require('gulp-terser')
	del = require('del'),
	mode = require('gulp-mode')(),
	fs = require('fs'),
	browserSync = require('browser-sync').create();

let html = () => {
	return src('./src/*.html')
		.pipe(fileInclude({  // труба
	      prefix: '@',
	      basepath: '@file'
	    }))
		.pipe(dest('./dist'))
		.pipe(mode.development(browserSync.stream()));
}

let styles = () => {
	return src('./src/styles/style.sass')
					.pipe(mode.development(sourcemaps.init()))
					.pipe(sass().on('error', sass.logError))
					.pipe(cleanCss({
						level: 2
					}))
					.pipe(autoprefixer({cascade: false}))
					.pipe(rename({
						suffix: '.min'
					}))
					.pipe(mode.development(sourcemaps.write('.')))
					.pipe(dest('./dist/styles/'))
					.pipe(mode.development(browserSync.stream()));
}

let externalStyles = () => {
	return src([
			'./node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
			'./node_modules/owl.carousel/dist/assets/owl.theme.default.min.css'
		])
		.pipe(concat('libs.min.css'))
		.pipe(dest('./dist/styles/'))
		.pipe(mode.development(browserSync.stream()));
}

let images = () => {
	return src(['./src/images/**/*.png','./src/images/**/*.jpeg'])
		.pipe(dest('./dist/images'))
		.pipe(mode.development(browserSync.stream()));
}

let spriteFolders = './src/images/svg';
let sprite = done => {
	fs.readdir(spriteFolders, (err, folders)=>{
		folders.forEach(folder=>{
			src(`./src/images/svg/${folder}/*.svg`)
			.pipe(svgSprite({
				mode: {
					stack: {
						sprite: '../sprite.svg'
					}
				}
			}))
			.pipe(dest(`./dist/images/svg/${folder}`))
			.pipe(mode.development(browserSync.stream()));
			})
	});

	done();
}

let fontFolders = './src/fonts';
let fonts = done => {
	fs.readdir(fontFolders, (err, folders) => {
		folders.forEach(folder=>{
			src(`./src/fonts/${folder}/*.ttf`)
			.pipe(ttf2wof())
			.pipe(dest(`./dist/fonts/${folder}`))
			.pipe(mode.development(browserSync.stream()));

			src(`./src/fonts/${folder}/*.ttf`)
			.pipe(ttf2wof2())
			.pipe(dest(`./dist/fonts/${folder}`))
			.pipe(mode.development(browserSync.stream()));
		});
	});

	done();
}

let scripts = () => {
	return src('src/js/script.js')
	    .pipe(babel({
	      presets: ['@babel/env']
	    }))
	    .pipe(webpack({
	      mode: 'development',
	      devtool: 'inline-source-map'
	    }))
	    .pipe(mode.development(sourcemaps.init()))
	    .pipe(rename('scripts.min.js'))
	    .pipe(mode.development(sourcemaps.write()))
	    .pipe(mode.production( terser({ output: { comments: false }}) ))
	    .pipe(dest('./dist/js'))
	    .pipe(mode.development(browserSync.stream()));
}

let externalScripts = () => {
	return src([
			'./node_modules/jquery/dist/jquery.min.js',
			'./node_modules/owl.carousel/dist/owl.carousel.min.js'
		])
		.pipe(concat('libs.min.js'))
		.pipe(mode.production( terser({ output: { comments: false }}) ))
		.pipe(dest('./dist/js'))
		.pipe(mode.development(browserSync.stream()));
}

let json = () => {
	return src('./src/json/*.json')
		.pipe(dest('./dist/json'))
		.pipe(mode.development(browserSync.stream()));
}

let clean = () => {
	return del(['dist/*']);
}

let watchFiles = () => {
	browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    watch('./src/**/*.html', html);
    watch('./src/styles/style.sass', styles);
    watch(['./src/images/**/*.png','./src/images/**/*.jpeg'], images);
    watch('./src/images/svg/**/*.svg', sprite);
    watch('./src/fonts/**/*.ttf', series(ttf2wof,ttf2wof2));
    watch('./src/js/*.js', series(scripts));
    watch('./src/json/*.json', json);
}

exports.default = series(clean, parallel(html, images, sprite, json, scripts, externalScripts, externalStyles), fonts, styles, watchFiles);
exports.build = series(clean, parallel(html, images, sprite, json, scripts, externalScripts, externalStyles), fonts, styles);
