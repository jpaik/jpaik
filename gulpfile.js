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
    del = require('del'),
    merge = require('merge-stream'),
    addsrc = require('gulp-add-src');

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
  var lib = gulp.src(['scripts/**/*.js', '!scripts/app/*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/js'));

  var scripts = gulp.src('scripts/app/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('assets/js'))

  return merge(scripts, lib)
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
  return del(['assets/css','assets/js/*.js','assets/images']);
});
gulp.task('clean-styles', function(){
  return del(['assets/css']);
});
gulp.task('clean-scripts', function(){
  return del(['assets/js/*.js']);
});

//Make a default task that runs
gulp.task('default', ['clean'], function(){
  gulp.start('styles','scripts', 'images');
});

/*Watch the files for changes to run tasks*/
gulp.task('watch', function(){
  gulp.watch('sass/**/*.scss', ['clean-styles','styles']);
  gulp.watch('scripts/**/*.js', ['clean-scripts','scripts']);
  gulp.watch('images/**/*', ['images']);
});
