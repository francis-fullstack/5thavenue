const gulp = require('gulp');
const removehtml = require('gulp-remove-html');
// const inject = require('gulp-inject')
const inject = require('gulp-inject-string');

const path = {
  // baseUrl: process.env.PWD,
  // src: process.env.PWD + '/src/',
  // dist: process.env.PWD + '/dist/'
  baseUrl: '..',
  src: '../src/',
  dist: '../dist/',

  sass: {
    outputStyle: 'compressed',
    includePaths: [],
  },

  sources: {
    sass: [
      // process.env.PWD + '/src/styles/main.scss'
      '../src/styles/main.scss',
    ],
  },
};

// const parallelTask = ['build:html', 'build:css', 'build:fonts']
const parallelTask = ['build:css', 'build:fonts'];

// gulp.task('build:html', done => {
//   return gulp.src(`${path.src}**/*.html`)
//     .pipe(removehtml())
//     .pipe(inject.after('</main>', '\n<script src="./scripts/bundle.min.js"></script>\n'))
//     .pipe(gulp.dest(path.dist))

//   done()
// })

require('./assets')(gulp, path);

var files = [
  { src : `${path.src}styles/main.min.css`, dest : `${path.dist}styles/` },
  { src : `${path.src}styles/splash.css`, dest : `${path.dist}styles/` },
  { src : `${path.src}styles/adventura.css`, dest : `${path.dist}styles/` },
  { src : `${path.src}styles/5thavenue.css`, dest : `${path.dist}styles/` }
];

gulp.task('build:css', async function(done) {
  await files.map(function(file) {
    return gulp.src([
        file.src 
    ])
    .pipe( gulp.dest(file.dest) )
    }); 
  
});


gulp.task('build:fonts', (done) => {
  return gulp
    .src(`${path.src}assets/fonts/**/*`)
    .pipe(gulp.dest(`${path.dist}assets/fonts/`));

  done();
});

require('./compress')(gulp, path);

gulp.task(
  'default',
  gulp.series(
    'assets',
    'build:compress',

    gulp.parallel(parallelTask),

    (done) => done()
  )
);
