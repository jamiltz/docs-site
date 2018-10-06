const connect = require('gulp-connect');
const generator = require('@antora/site-generator-default');
const gulp = require('gulp');

let args = [
  "--playbook",
  "local-tutorials-antora-playbook.yml"
];

gulp.task('tutorials:build', function (cb) {
  generator(args, process.env)
    .then(() => {
      cb();
    })
});

gulp.task('tutorials:preview', ['tutorials:build'], function () {
  /**
   * Remove the line gulp.src('README.adoc')
   * This is placeholder code to follow the gulp-connect
   * example. Could not make it work any other way.
   */
  gulp.src('README.adoc')
    .pipe(connect.reload());
})

gulp.task('tutorials:connect', function() {
  connect.server({
    port: 5252,
    name: 'Dev Server',
    livereload: true,
    root: 'public',
  });
});

gulp.task('tutorials:watch', function () {
  let dirs = ['../**/**.yml', '../**/**.adoc'];
  gulp.watch(dirs, ['tutorials:preview']);
});