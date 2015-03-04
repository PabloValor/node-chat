var gulp = require('gulp'),
	less = require('gulp-less'),
	refresh = require('gulp-livereload'),
	uglify = require('gulp-uglify'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'),
	minifyCSS = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer');

var basePaths = {
	src: './app/public/assets/',
	dest: './app/public/assets/'
}

var paths = {
	images: {
		src: basePaths.src + 'images/',
		dest: basePaths.dest + 'images/min/',
	},
	scripts: {
		src: basePaths.src + 'js/',
		dest: basePaths.dest + 'js/min/',
	},
	styles: {
		src: basePaths.src + 'css/',
		dest: basePaths.dest + 'css/min/',
	}
}


gulp.task('compress-images', function() {
	gulp.src([paths.images.src + '*.*'])
		.pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
		.pipe(gulp.dest(paths.images.dest))
		.on('error',gutil.log);
});

gulp.task('compress-javascript', function() {
	gulp.src([paths.scripts.src + 'vendor/moment.js', paths.scripts.src + 'vendor/*.js', paths.scripts.src + 'main.js'])
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.scripts.dest))
		.on('error',gutil.log)
		.pipe(refresh());

	gulp.src([paths.scripts.src + 'vendor/moment.js', paths.scripts.src + 'vendor/*.js', paths.scripts.src + 'login.js'])
		.pipe(concat('login-app.js'))
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.scripts.dest))
		.on('error',gutil.log)
		.pipe(refresh());		
});

gulp.task('less', function() {
	gulp.src(paths.styles.src + 'main.less')
		.pipe(less({
			paths: './app/public/assets/css/',
			filename: 'main.less'
			}))
		.on('error', gutil.log)
		.pipe(autoprefixer({
			browsers: ['last 2 versions', 'IE 8', 'IE 9', 'last 5 versions', 'Firefox 14', 'Opera 11.1'],
            cascade: false
        	}
        ))		
		.pipe(minifyCSS({keepSpecialComments: 0}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(refresh());
});

gulp.task('watch', function() {
	refresh.listen();

	gulp.watch(paths.styles.src, ['less']);
	gulp.watch(paths.scripts.src, ['compress-javascript']);
	gulp.watch(paths.images.src, ['compress-images']);
});

gulp.task('default', ['watch', 'less', 'compress-javascript','compress-images']);