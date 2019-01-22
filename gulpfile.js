let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var header = require('gulp-header');
var autoprefixer = require('gulp-autoprefixer');

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

// Task to minify css using package cleanCSs
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

gulp.task('develop', gulp.series('sass', 'minify-css'))