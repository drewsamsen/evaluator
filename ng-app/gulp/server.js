'use strict';

var gulp = require('gulp');
var paths = gulp.paths;
var util = require('util');
var browserSync = require('browser-sync');
var args = require('yargs').argv;
var fs = require('fs');

function browserSyncInit(baseDir, files, browser) {
  browser = browser === undefined ? 'default' : browser;

  var routes = null;
  if(baseDir === paths.src || (util.isArray(baseDir) && baseDir.indexOf(paths.src) !== -1)) {
    routes = {
      '/bower_components': 'bower_components'
    };
  }

  var browserSyncConf = {
    startPath: '/',
    server: {
      baseDir: baseDir,
      routes: routes
    },
    browser: browser
  };

  var filePath = paths.src + '/config/env/' + (args.env || 'dev') + '.json';

  if (fs.existsSync(filePath)) {
    var settings = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    browserSyncConf.host = settings.APP_URL.split('//')[1].split(':')[0] || null;
    browserSyncConf.open = 'external';
  }

  browserSyncConf.open = false;
  browserSyncConf.notify = false;

  browserSync.instance = browserSync.init(files, browserSyncConf);
}

gulp.task('serve', ['watch'], function () {
  browserSyncInit([
    paths.tmp + '/serve',
    paths.src
  ], [
    paths.tmp + '/serve/{modules,components}/**/**/*.css',
    paths.src + '/{modules,components,directives,filters,providers,services,config}/**/**/*.js',
    paths.src + 'src/assets/images/**/*',
    paths.tmp + '/serve/*.html',
    paths.tmp + '/serve/{modules,components}/**/**/*.html',
    paths.src + '/{modules,components}/**/**/*.html'
  ]);
});

gulp.task('serve:dist', ['build'], function () {
  browserSyncInit(paths.dist);
});

gulp.task('serve:e2e', ['inject'], function () {
  browserSyncInit([paths.tmp + '/serve', paths.src], null, []);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit(paths.dist, null, []);
});
