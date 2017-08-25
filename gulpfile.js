/* eslint arrow-body-style: 0 */

const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');


const paths = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
};
const filename = 'jquery.track.js';


/**
 * Transpile es6 to es5 using babel
 *
 * @see {@link https://babeljs.io/docs/usage/options/}
 */
gulp.task('babel', () => {
  return gulp.src(`${paths.src}/${filename}`)
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
gulp.task('uglify', ['babel'], () => {
  return gulp.src(`${paths.dist}/${filename}`)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', () => {
  gulp.watch('src/*.js', ['babel']);
});

gulp.task('build', ['uglify']);
gulp.task('dev', ['build', 'watch']);
gulp.task('default', ['build']);
