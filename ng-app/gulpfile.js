'use strict';

var gulp = require('gulp');

gulp.paths = {
  src: 'app',
  dist: '../public/app',
  tmp: '.tmp'
};

require('require-dir')('./gulp');

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
