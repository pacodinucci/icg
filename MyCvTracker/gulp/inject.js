'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;
var _ = require('lodash');

var browserSync = require('browser-sync');

gulp.task('inject-reload', ['inject'], function () {
  browserSync.reload();
});

gulp.task('inject', ['scripts', 'styles', 'injectAuth', 'injectFront', 'injectTerms', 'injectCVMarketing', 'injectCVWriting', 'copyVendorImages','injectForward','injectActivate','injectSelfCompose'], function () {
  var injectStyles = gulp.src([
    path.join(conf.paths.tmp, '/serve/app/main.css'),
    path.join('!' + conf.paths.tmp, '/serve/app/vendor.css')
  ], {read: false});

  var injectScripts = gulp.src([
    path.join(conf.paths.src, '/assets/js/**/*.js'),
    path.join(conf.paths.src, '/app/**/*.module.js'),
    path.join(conf.paths.src, '/app/**/*.js'),
    path.join('!' + conf.paths.src, '/app/**/*.spec.js'),
    path.join('!' + conf.paths.src, '/app/**/*.mock.js'),
  ])
    /*.pipe($.angularFilesort())*/.on('error', conf.errorHandler('AngularFilesort'));

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(path.join(conf.paths.src, '/index.html'))
    .pipe($.inject(injectStyles, injectOptions))
    .pipe($.inject(injectScripts, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
});

gulp.task('injectAuth', ['stylesAuth'], function () {
  return injectAlone({
    css: [path.join('!' + conf.paths.tmp, '/serve/app/vendor.css'), path.join(conf.paths.tmp, '/serve/app/auth.css')],
    paths: [path.join(conf.paths.src, '/auth.html'), path.join(conf.paths.src, '/reg.html')]
  })
});

gulp.task('injectFront', ['stylesFront'], function () {
    return injectAlone({
        css: [path.join('!' + conf.paths.tmp, '/serve/app/vendor.css'), path.join(conf.paths.tmp, '/serve/app/front.css')],
        paths: [path.join(conf.paths.src, '/topcvreviews.html'), path.join(conf.paths.src, '/job-spec.html'),
          path.join(conf.paths.src, '/jobkeywords-match.html'),
          path.join(conf.paths.src, '/how-to-get-paid-internships.html'),
          path.join(conf.paths.src, '/cv-writing-page.html'),
          path.join(conf.paths.src, '/linkedin-profile-writing.html'),
          path.join(conf.paths.src, '/cover-letter-page.html'),
          path.join(conf.paths.src, '/cvhosting.html'),
          path.join(conf.paths.src, '/cvoffers.html'),
          path.join(conf.paths.src, '/cv-writing-packages.html'),
          path.join(conf.paths.src, '/cv-writing-package-2.html'),
          path.join(conf.paths.src, '/graduate-package-1.html'),
          path.join(conf.paths.src, '/graduate-package-2.html'),
          path.join(conf.paths.src, '/cv-writing-package-3.html'),
          path.join(conf.paths.src, '/pdf-viewer.html'), path.join(conf.paths.src, '/network-share.html'),
          path.join(conf.paths.src, '/context-link.html'), path.join(conf.paths.src, '/cv-box.html')]
    })
});

gulp.task('injectTerms', ['stylesFront'], function () {
    return injectAlone({
        css: [path.join('!' + conf.paths.tmp, '/serve/app/vendor.css'), path.join(conf.paths.tmp, '/serve/app/front.css')],
        paths: path.join(conf.paths.src, '/terms.html')
    })
});

gulp.task('injectCVWriting', ['stylesFront'], function () {
    return injectAlone({
        css: [path.join('!' + conf.paths.tmp, '/serve/app/vendor.css'), path.join(conf.paths.tmp, '/serve/app/front.css')],
        paths: path.join(conf.paths.src, '/cvwritingpackages.html')
    })
});

gulp.task('injectCVMarketing', ['stylesFront'], function () {
    return injectAlone({
        css: [path.join('!' + conf.paths.tmp, '/serve/app/vendor.css'), path.join(conf.paths.tmp, '/serve/app/front.css')],
        paths: path.join(conf.paths.src, '/cvmarketing.html')
    })
});

gulp.task('injectForward', ['stylesFront'], function () {
    return injectAlone({
        css: [path.join('!' + conf.paths.tmp, '/serve/app/vendor.css'), path.join(conf.paths.tmp, '/serve/app/front.css')],
        paths: path.join(conf.paths.src, '/forward.html')
    })
});

gulp.task('injectActivate', ['stylesFront'], function () {
    return injectAlone({
        css: [path.join('!' + conf.paths.tmp, '/serve/app/vendor.css'), path.join(conf.paths.tmp, '/serve/app/front.css')],
        paths: path.join(conf.paths.src, '/activate.html')
    })
});

gulp.task('injectSelfCompose', ['stylesFront'], function () {
    return injectAlone({
        css: [path.join('!' + conf.paths.tmp, '/serve/app/vendor.css'), path.join(conf.paths.tmp, '/serve/app/front.css')],
        paths: path.join(conf.paths.src, '/selfcompose.html')
    })
});

var injectAlone = function (options) {
  var injectStyles = gulp.src(
    options.css
    , {read: false});

  var injectOptions = {
    ignorePath: [conf.paths.src, path.join(conf.paths.tmp, '/serve')],
    addRootSlash: false
  };

  return gulp.src(options.paths)
    .pipe($.inject(injectStyles, injectOptions))
    .pipe(wiredep(_.extend({}, conf.wiredep)))
    .pipe(gulp.dest(path.join(conf.paths.tmp, '/serve')));
};
