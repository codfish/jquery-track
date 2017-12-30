const gulp = require('gulp');
const babel = require('gulp-babel');
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

gulp.task('watch', () => {
  gulp.watch('src/*.js', ['babel']);
});

gulp.task('dev', ['babel', 'watch']);
gulp.task('default', ['babel']);
