const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const rimraf = require('rimraf');
const fs = require('fs');
const path = require('path');

require('shelljs/global');


const paths = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
};


/**
 * Clean start. Remove all dist files.
 *
 * @see {@link https://www.npmjs.com/package/rimraf}
 */
gulp.task('clean', function () {
  rimraf(paths.dist, function (err) {
    if (err) throw err;
  });
});

/**
 * Transpile es6 to es5 using babel
 *
 * @see {@link https://babeljs.io/docs/usage/options/}
 */
gulp.task('babel', ['clean'], function () {
  return gulp.src(paths.src + '/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist));
});

/**
 * Uglify
 *
 * @see {@link https://www.npmjs.com/package/gulp-uglify#options}
 */
gulp.task('uglify', ['babel'], function () {
  return gulp.src(paths.dist + '/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['uglify']);
gulp.task('default', ['build']);
