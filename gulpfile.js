const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const rimraf = require('rimraf');
const fs = require('fs');

require('shelljs/global');


const paths = {
  src: './src',
  dist: './dist',
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
    .pipe(rename(function (path) {
      path.extname = ".min.js"
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build', ['uglify']);
gulp.task('default', ['build']);
