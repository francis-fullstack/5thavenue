'use strict';

// const rename = require('gulp-rename')
// const concat =  require('gulp-concat')
// const jsmin = require('gulp-jsmin')
// const babel = require('gulp-babel')
const imagemin = require('gulp-imagemin');
// const imageminMozjpeg = require('imagemin-mozjpeg')
// const imageminPngquant = require('imagemin-pngquant')
// const imageminGiflossy = require('imagemin-giflossy')
const useref = require('gulp-useref');
// const uglify = require('gulp-uglify');
const terser = require('gulp-terser');
const gulpIf = require('gulp-if');

module.exports = (gulp, path) => {
  const parallelTasks = ['build:image'];
  const seriesTasks = ['build:useref'];

  var media = [
    { src : `${path.src}assets/images/**/*`, dest : `${path.dist}assets/images/` },
    { src : `${path.src}assets/videos/5thave/**/*.mp4`, dest :`${path.dist}assets/videos/5thAve/` },
    { src : `${path.src}assets/videos/Adventura/**/*.mp4`, dest : `${path.dist}assets/videos/Adventura/`  },
  ];

  gulp.task('build:image', async function(done) {
    return (
      await media.map(function(file) {
        return gulp.src(file.src)
        .pipe(
          imagemin([
            // imageminPngquant({
            //   speed: 1,
            //   quality: 70
            // }),
            // imageminMozjpeg({
            //   quality: 50
            // }),
            // imageminGiflossy({
            //   optimizationLevel: 3,
            //   optimize: 3, //keep-empty: Preserve empty transparent frames
            //   lossy: 2
            // }),
            // imagemin.jpegtran({progressive: true}),
            // imagemin.optipng({optimizationLevel: 7}),
            imagemin.svgo({
              plugins: [{removeViewBox: false}],
            }),
          ])
          .pipe(gulp.dest(file.dest))

    )})
  )});

  // gulp.task('build:vendorsJS', done => {
  //   return gulp.src(vendorsJS)
  //     .pipe(concat('bundle.js'))
  //     // .pipe(jsmin())
  //     .pipe(rename({suffix: '.min'}))
  //     .pipe(gulp.dest(`${path.dist}scripts/`))

  //   done()
  // })

  // gulp.task('build:concatjs', done => {
  //   return gulp.src(forBundleJS)
  //     .pipe(babel())
  //     .pipe(concat('bundle.js'))
  //     // .pipe(jsmin())
  //     .pipe(rename({suffix: '.min'}))
  //     .pipe(gulp.dest(`${path.dist}scripts/`))

  //   done()
  // })
  var files = [
    { src : `${path.src}*.html`, dest : `${path.dist}` },
    { src : `${path.src}/5th-avenue/*.html`, dest : `${path.dist}5th-avenue/` },
    { src : `${path.src}/adventura/*.html`, dest : `${path.dist}adventura/` }
  ];

  gulp.task('build:useref', async function () {
    return (
      await files.map(function(file) {
        return gulp.src([
            file.src 
        ])
        .pipe(useref())
        // .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.js', terser()))
        .pipe( gulp.dest(file.dest) )
        })
    );
  });

  gulp.task(
    'build:compress',
    gulp.series(
      gulp.parallel(parallelTasks),
      seriesTasks,

      (done) => done()
    )
  );
};
