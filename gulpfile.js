var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var header = require('gulp-header');
var autoprefixer = require('gulp-autoprefixer');
var pkg = require('./package.json');

// Compile SCSS
gulp.task('sass', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./css'))
});

// Task to minify css using package cleanCSS
gulp.task('minify-css', () => {
     // Folder with files to minify
       return gulp.src([
      './css/*.css',
      '!./css/*.min.css'
    ])
     //The method pipe() allow you to chain multiple tasks together 
     //I execute the task to minify the files
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    //I define the destination of the minified files with the method dest
    .pipe(gulp.dest('./css'))
});

// Minify JavaScript
gulp.task('minify-js', function() {
  return gulp.src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js'))
});

gulp.task('develop', gulp.series('sass', 'minify-css', 'minify-js'));