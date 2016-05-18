var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var jade  = require('gulp-jade');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var browserSync = require('browser-sync').create();

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    open: false
  })
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});

gulp.task('images', function() {
  gulp.src('app/assets/imgs/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/imgs/'));
});

gulp.task('jade', function() {
  return gulp.src(['app/views/**/*.jade', '!app/views/templates/**.jade', '!app/views/includes/**.jade'] )
    .pipe(jade({
      pretty: true,
      filename: 'default',
      doctype: 'html'
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('sass', function() {
  return gulp.src('app/scss/main.scss')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function() {
  return gulp.src('app/js/**/*.js')
    .pipe(plumber({
      errorHandler: function(error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(babel())
    .pipe(gulp.dest('dist/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('watch', ['browserSync', 'sass', 'jade', 'js', 'images'], function() {
  gulp.watch('app/scss/**/*.scss', ['bs-reload', 'sass']);
  gulp.watch('app/views/**/*.jade', ['jade']);
  gulp.watch('app/js/*.js', ['bs-reload', 'js']);
  gulp.watch('*.html', ['bs-reload']);
});
