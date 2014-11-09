var 	gulp = require('gulp'),
        	plumber = require('gulp-plumber'),
        	uglify = require('gulp-uglify'),
        	 imagemin = require('gulp-imagemin'),
        	less = require("gulp-less");

gulp.task('min-js', function () {
	gulp.src('./public/images/*')
	.pipe(imagemin())
	.pipe(gulp.dest('./public/build/images/'));
});

gulp.task('min-image', function () {
	gulp.src('./public/js/*.js')
	.pipe(plumber())
	.pipe(uglify())
	.pipe(gulp.dest('./public/build/js'));
});

gulp.task('compile-less', function() {
	gulp.src('./public/css/*.less')
	.pipe(plumber())
	.pipe(less( {
		compress: true	
	}))
	.pipe(gulp.dest('./public/build/css'));
});


    
gulp.task('watch', function() {
	gulp.watch('./public/js/*.js', ['min-js']);
	gulp.watch('./public/css/*.less', ['compile-less']);
	gulp.watch('./public/images/*', ['min-image']);
});



gulp.task('default', ['min-js', 'min-image','compile-less','watch']);
