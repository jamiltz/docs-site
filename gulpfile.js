'use strict'

const connect = require('gulp-connect');
const generator = require('@antora/site-generator-default');
const gulp = require('gulp');

let args = [
  "--playbook",
  "local-antora-playbook.yml"
];

gulp.task('build', function (cb) {
  generator(args, process.env)
    .then(() => {
      cb();
    })
});

gulp.task('preview', ['build'], function () {
  /**
   * Remove the line gulp.src('README.adoc')
   * This is placeholder code to follow the gulp-connect
   * example. Could not make it work any other way.
   */
  gulp.src('README.adoc')
    .pipe(connect.reload());
})

gulp.task('watch', function () {
  let dirs = ['../**/**.yml', '../**/**.adoc'];
  gulp.watch(dirs, ['preview']);
});

gulp.task('connect', function() {
  connect.server({
    port: 5252,
    name: 'Dev Server',
    livereload: true,
    root: 'public',
  });
});

gulp.task('default', ['connect', 'watch', 'build'])
