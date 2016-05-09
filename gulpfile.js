/*Initialize the plugins*/
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

/*Create Tasks*/

//Sass compilation Task
gulp.task('styles', function(){
  return sass('sass/styles.scss', {sourcemap: false, style: 'expanded'})
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('assets/css'))
    .pipe(notify({message: 'Sass task complete'}));
});

//Javascript Compilation and Minification Task
gulp.task('scripts', function(){
  return gulp.src('scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('assets/js'))
    .pipe(notify({message: 'Javascript task complete'}));
});

//Compress and optimize images (So that I don't have to use the optimizers online)
gulp.task('images', function(){
  return gulp.src('images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true})))
    .pipe(gulp.dest('assets/images'))
    .pipe(notify({message: 'Image task complete'}));
});

//Delete old files to rebuild
gulp.task('clean', function(){
  return del(['assets/css','assets/js','assets/images']);
});

//Make a default task that runs
gulp.task('default', ['clean'], function(){
  gulp.start('styles','scripts', 'images');
});

/*Watch the files for changes to run tasks*/
gulp.task('watch', function(){
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch('scripts/**/*.js', ['scripts']);
  gulp.watch('images/**/*', ['images']);
});
