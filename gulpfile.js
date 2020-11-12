const conf = {
  // html
  htmlMin:         false,
  // css
  cssMin:          true,
  cssPurge:        false,
  cssRejected:     true,
  cssAutoPrefix:   true,
  cssSourceMaps:   false,
  // JavaScript
  jsMin:           false,
  jsBabel:         true,
  jsSourceMaps:    false,
  // php
  phpServer:       false,
  // proxy:           '127.0.0.1',
  // port:            '8000',
  // tiny png
  tinypng:         true,
  tinypngKey:      'Mk1NnP5T4c9M831s1HY865hnRSfrJJHq',
  // icons
  notifyIcon:      'https://lh3.google.com/u/0/d/16jRin4fn-SzpLPAhWKIjgb1TlSJUe7eS=s2048',
  notifyIconError: 'https://lh3.google.com/u/0/d/1MG16huTiZQyxZmdnCzjhIH1zF25HA0gZ=s2048',
  // gulp
  showGulpedFiles: false,
  // Folder names
  path:            {
      dest:   'dist',
      dev:    'dev',
      img:    'img',
      // fonts:  'fonts',
      // data:   'data',
      // vendor: 'vendor',
      js:     '',
      css:    '',
      // video:  'video',
      // audio:  'audio',
      // pdf:    'pdf',
  },
  purgeCssWhitelist: [

  ],
};

// Require the gulp components
const { src, dest, watch, series, parallel } = require('gulp');

// Require file system
const fs = require('fs');

// This is the only plugin we will require which loads other plugins automatically by using a '$' sign
const $ = require('gulp-load-plugins')({ overridePattern: true, pattern: ['gulp{-,.}*', 'browser-*', 'file-*', '*'] });

const purgecss = require('@fullhuman/postcss-purgecss');

/**
* Run a gulp file task
* @param {String} glob Gulp file selector
* @param {String} destPath Destination sub-folder
* @param {Boolean} changedContents Should we check for content or time changed
*/
function gulpFiles(glob, destPath, changedContents) {
glob = glob || '';
destPath = destPath ? `${destPath}/` : '';
changedContents = changedContents ? $.changed.compareContents : $.changed.compareLastModifiedTime;
// create easy to use 'is' object
const is = {
    sass:     glob.includes('.scss'),
    html:     glob === '.html',
    js:       glob === '.js',
    // vendor:   destPath === `${conf.path.vendor}/`,
    // htaccess: glob === '.htaccess',
};

// set up the source of our files, include glob while ignoring other stuff
const source = [
    `${conf.path.dev}/${destPath}**/*${glob}`,
    // `!${conf.path.dev}/**/*.tpl.html`, // ignore html tpl files
    // `!${conf.path.dev}/**/*.map`, // ignore map files
    // `!${conf.path.dev}/**/*LICENSE`, // ignore license files
    `!${conf.path.dev}/**/*package-lock.json`, // ignore package lock files
    `!${conf.path.dev}/**/*package.json`, // ignore package files
    `!${conf.path.dev}/**/*gulpfile.js`, // ignore gulp files
    // `!${conf.path.dev}/**/*bower.json`, // ignore bower files
    `!${conf.path.dev}/**/*.md`, // ignore read me files
    // `!${conf.path.dev}/**/*installed.json`, // ignore composer file
    // `!${conf.path.dev}/**/*composer.lock`, // ignore composer file
    // `!${conf.path.dev}/**/*composer.json`, // ignore composer file
    `!${conf.path.dev}/**/node_modules{,/**}`, // ignore node module folders
];
// If we are copying vendor files, ignore a bunch of stuff
// if (is.vendor) {
//     source.push(
//         `!${conf.path.dev}/${conf.path.vendor}/**/*.scss`, // ignore scss files
//         `!${conf.path.dev}/${conf.path.vendor}/**/*.less`, // ignore less files
//         `!${conf.path.dev}/${conf.path.vendor}/**/less{,/**}`, // ignore less folders
//         `!${conf.path.dev}/${conf.path.vendor}/**/scss{,/**}`, // ignore sass folders
//     );
// if not vendor, ignore vendor folder
// } else {
//     source.push(`!${conf.path.dev}/${conf.path.vendor}/**/*`);
// }


// return
return src(source)
    // Global Plumber
    .pipe($.plumber({ errorHandler: $.notify.onError({ message: `❌ ${glob.replace(/[^a-zA-Z0-9,]/g, '').toUpperCase()}: <%= error.message %>`, icon: conf.notifyIconError }) }))
    // Global Debug
    .pipe($.debug({ title: glob.replace(/[^a-zA-Z0-9,]/g, '').toUpperCase(), showFiles: conf.showGulpedFiles }))
    // Check if changed and not a folder
    .pipe($.if(f => !f.isDirectory(), $.changed(conf.path.dest, { hasChanged: changedContents })))
    // Sass
    .pipe($.if(is.sass && conf.cssSourceMaps, $.sourcemaps.init()))
    .pipe($.if(is.sass, $.sass().on('error', $.sass.logError)))
    .pipe($.if(is.sass, $.postcss([
        conf.cssAutoPrefix && $.autoprefixer({ cascade: false }),
        conf.cssMin && $.cssnano(),
        conf.cssPurge && purgecss({ content: [`${conf.path.dev}/**/*.{html,php}`], whitelist: conf.purgeCssWhitelist, rejected: true }),
        $.postcssCombineMediaQuery(),
    ].filter(Boolean))))
    .pipe($.if(is.sass && conf.cssMin, $.rename({ extname: '.min.css' })))
    // .pipe($.if(is.sass && conf.cssPurge, $.purgecss({ content: [`${conf.path.dev}/**/*.{html,php}`], whitelist: conf.purgeCssWhitelist, rejected: conf.cssRejected })))
    .pipe($.if(is.sass && conf.cssSourceMaps, $.sourcemaps.write('.')))
    // JavaScript
    .pipe($.if(is.js && conf.jsSourceMaps, $.sourcemaps.init()))
    .pipe($.if(is.js && conf.jsBabel, $.babel({ presets: ['@babel/preset-env'] })))
    .pipe($.if(is.js && conf.jsMin, $.uglify()))
    .pipe($.if(is.js && conf.jsMin, $.rename({ extname: '.min.js' })))
    .pipe($.if(is.js && conf.jsSourceMaps, $.sourcemaps.write('.')))
    // Minify png/jpg/svg
    .pipe($.if(conf.tinypng && (f => ['.png', '.jpg', '.jpeg'].includes(f.extname)), $.tinypngCompress({ key: conf.tinypngKey, sigFile: `${conf.path.dev}/${destPath}` })))
    .pipe($.if(f => f.extname === '.svg', $.svgo()))
    // HTML
    // .pipe($.if(is.html, $.replace(/<!-- @import(.*?) -->/g, replaceMatch)))
    .pipe($.if(is.html && conf.htmlMin, $.htmlmin({ collapseWhitespace: true })))
    // Destination to save
    .pipe(dest(`${conf.path.dest}/${destPath}`))
    // Browser stream
    .pipe($.browserSync.stream())
    // Notify
    .pipe($.notify({ title: glob.replace(/[^a-zA-Z0-9,]/g, '').toUpperCase(), message: '✅ Task completed!', icon: conf.notifyIcon, onLast: true }));
}

/**
* Used to sync deleing and renaming files
* @param {String} action Action taken on the file
* @param {String} path Path of the file
*/
function fileSync(action, path) {
const devPath = $.path.relative($.path.resolve(conf.path.dev), path);
const destPath = $.path.resolve(conf.path.dest, devPath);
if (fs.existsSync(destPath)) {
    if (action === 'unlink')
        fs.unlinkSync(destPath);
    if (action === 'change')
        $.rename(destPath);
}
}

/**
* Use BrowserSync
*/
function bSync() {
const options = {
    watch:          true,
    injectChanges:  true,
    open:           true,
    ghostMode:      false,
    snippetOptions: {
        rule: {
            match: /<\/body>/i,
            fn:    (snippet, match) => snippet + match,
        },
    },
};
if (conf.phpServer) {
    options.proxy = `${conf.proxy}:${conf.port}`;
} else {
    options.server = {
        baseDir:   conf.path.dest,
        directory: true,
    };
}
$.browserSync.init(options);
}


// Processed Files
exports.js       = function js() { return gulpFiles('.js', ''); };
// exports.php      = function php() { return gulpFiles('.php', '', true); };
exports.sass     = function sass() { return gulpFiles('[^_]*.scss', ''); };
exports.img      = function img() { return gulpFiles('.{png,jpg,jpeg,gif,svg}', ''); };
// Straight copy
exports.ico      = function ico() { return gulpFiles('favicon.ico', '', true); };
// exports.htaccess = function htaccess() { return gulpFiles('.htaccess', '', true); };
exports.html     = function html() { return gulpFiles('.html', '', true); };
// exports.fonts    = function fonts() { return gulpFiles('.{woff,woff2}', conf.path.fonts, true); };
// exports.video    = function video() { return gulpFiles('.{mp4,webm}', conf.path.video, true); };
// exports.audio    = function audio() { return gulpFiles('.{mp3,wav}', conf.path.audio, true); };
// exports.pdf      = function pdf() { return gulpFiles('.pdf', conf.path.pdf, true); };
// exports.vendor   = function vendor() { return gulpFiles('', conf.path.vendor, true); };
// exports.json     = function json() { return gulpFiles('.json', conf.path.data, true); };

/**
* We watch for changes.
*/
function watchMe() {
  watch(`${conf.path.dev}/**/*.html`, exports.html);
  // watch(`${conf.path.dev}/**/*.php`, exports.php);
  watch(`${conf.path.dev}/**/*.scss`, exports.sass);
  watch(`${conf.path.dev}/**/*.js`, exports.js);
  watch(`${conf.path.dev}/favicon.ico`, exports.ico);
  // watch(`${conf.path.dev}/.htaccess`, exports.htaccess);
  // watch(`${conf.path.dev}/${conf.path.json}/**/*.json`, exports.json);
  // watch(`${conf.path.dev}/${conf.path.fonts}/**/*.{woff,woff2}`, exports.fonts);
  // watch(`${conf.path.dev}/${conf.path.pdf}/**/*.pdf`, exports.pdf);
  // watch(`${conf.path.dev}/${conf.path.video}/**/*.{mp4,webm}`, exports.video);
  watch(`${conf.path.dev}/**/*.{png,jpg,jpeg,gif,svg,ico}`, exports.img);
  // watch(`${conf.path.dev}/${conf.path.vendor}/**/*`, exports.vendor);
  watch(`${conf.path.dev}/**/*`).on('all', fileSync);
  $.browserSync.reload();
}

// Export tasks
exports.watch = watchMe;
exports.browser = parallel(conf.phpServer ? phpServer : bSync, exports.watch);
exports.default = series(
  exports.html,
  exports.js,
  // exports.php,
  exports.sass,
  // exports.json,
  // exports.vendor,
  // exports.video,
  // exports.audio,
  // exports.pdf,
  exports.img,
  exports.ico,
  // exports.htaccess,
  exports.browser,
);