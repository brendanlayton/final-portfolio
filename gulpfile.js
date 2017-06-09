'use strict';

var gulp = require('gulp'),
		concat = require('gulp-concat'),
		uglify = require('gulp-uglify'),
		rename = require('gulp-rename'),
		cleanCSS = require('gulp-clean-css'),
		del = require('del'),
		postcss = require('gulp-postcss'),
		autoprefixer = require('autoprefixer'),
		csso = require('gulp-csso'),
		inlinesource = require('gulp-inline-source'),
		htmlmin = require('gulp-htmlmin'),
		gzip = require('gulp-gzip');

gulp.task('concatScripts', function() {
	return gulp.src([
		'js/jquery.js',
		'js/bootstrap.js',
		'js/app.js'])
	.pipe(concat('scripts.js'))
	.pipe(gulp.dest('js'));
});

gulp.task('inlinesource', function () {
    return gulp.src('index-dev.html')
        .pipe(inlinesource())
				.pipe(htmlmin({collapseWhitespace: true}))
				.pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});

gulp.task('concatStyles', function() {
	return gulp.src([
		'css/bootstrap.css',
		'css/my-styles.css'])
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('css'));
});

gulp.task('process-css', ['concatStyles'], function() {
	var plugins = [
		autoprefixer({
			browsers: ['last 3 version']
		})
	];
	return gulp.src('css/styles.css')
		.pipe(postcss(plugins))
		.pipe(gulp.dest('css'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
		return gulp.src('js/scripts.js')
			.pipe(uglify()).on('error', function(e){
            console.log(e);
         })
			.pipe(rename('scripts.min.js'))
			.pipe(gzip())
			.pipe(gulp.dest('js'));
});

gulp.task('minifyStyles', ['process-css'], function() {
	return gulp.src('css/styles.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(rename('styles.min.css'))
		.pipe(gzip())
		.pipe(gulp.dest('css'));
});

gulp.task('clean', function() {
	del(['dist', 'js/scripts*.js', 'css/styles*.css']);
});


gulp.task('build', ['minifyScripts', 'minifyStyles', 'inlinesource'], function() {
	return gulp.src(['css/styles.min.css.gz', 'js/scripts.min.js.gz', 'index.html', 'img/**', 'icons/**'], { base: './'})
		.pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean'], function() {
	gulp.start('build');
});