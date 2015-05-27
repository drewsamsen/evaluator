'use strict';

var gulp = require('gulp');

var paths = gulp.paths;

gulp.task('watch', ['markups', 'inject'], function () {
  gulp.watch([
    paths.src + '/*.html',
    paths.src + '/{modules,components}/**/**/*.html',
    paths.src + '/{modules,components,assets}/**/**/*.scss',
    paths.src + '/{modules,components,directives,filters,services,config}/**/**/*.js',
    'bower.json'
  ], ['inject']);
  gulp.watch(paths.src + '/{modules,components}/**/**/*.jade', ['markups']);
});
