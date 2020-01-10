const conf = {

};

const {dest, src, watch, parallel} = require('gulp');
const $ = require('gulp-load-plugins')({ 
  overridePattern: true,  // false returns only 'gulp-*', 'gulp.*', '@*/gulp{-,.}*'
  pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*', 'browser-*'] 
});
// with gulp-load-plugins becomes obsolete
// const browserSync = require('browser-sync').create();

function modHtml() {
  return src('./*.html')
    .pipe($.plumber())
    .pipe($.debug())
    // .pipe($.connect.reload())
    .pipe($.browserSync.stream())
    .pipe($.notify({ message: '\n\n✅ HTML - completed!\n', onLast: true }));
};

function modScss() {
  return src('./css/*.scss')
    .pipe($.plumber())
    .pipe($.debug())
    .pipe($.sass({ outputStyle: 'compact' }).on('error', $.sass.logError))
    .pipe(dest('./css/'))
    // .pipe($.connect.reload())
    .pipe($.browserSync.stream())
    .pipe($.notify({ 
      message: '\n\n✅ Sass - completed!\n', //message
      onLast: true })); //send message only onlast file
}

function bSync() {
  $.browserSync.init({
    server: {
      baseDir: "./"
    }
  });
};

function watchTower() {
  watch('./*.html', modHtml);
  watch('./css/*.scss', modScss);
}

exports.default = parallel(bSync, watchTower); //bSync wins



// The `clean` function is not exported so it can be considered a private task.
// It can still be used within the `series()` composition.
// function clean(cb) {
//   const currFolder = __dirname.split('/');
//   const cleanName = currFolder[currFolder.length - 1].replace(/\s/g, '_');
//   console.log(currFolder, cleanName);

//   cb();
// }

// // The `build` function is exported so it is public and can be run with the `gulp` command.
// // It can also be used within the `series()` composition.
// function build(cb) {
//   // body omitted
//   cb();
// }

// exports.build = build;
// exports.default = series(clean, build);