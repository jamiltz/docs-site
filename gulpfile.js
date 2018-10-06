'use strict'

const connect = require('gulp-connect');
const generator = require('@antora/site-generator-default');
const gulp = require('gulp');

require('./tasks/docs');
require('./tasks/tutorials')

gulp.task('connect', function() {
  connect.server({
    port: 5252,
    name: 'Dev Server',
    livereload: true,
    root: 'public',
  });
});

gulp.task('docs', ['connect', 'docs:watch', 'docs:build'])
gulp.task('tutorials', ['connect', 'tutorials:watch', 'tutorials:build'])
gulp.task('default', ['docs', 'tutorials'])