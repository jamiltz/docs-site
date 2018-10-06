const connect = require('gulp-connect');
const generator = require('@antora/site-generator-default');
const gulp = require('gulp');

let args = [
  "--playbook",
  "local-antora-playbook.yml"
];

gulp.task('docs:build', function (cb) {
  generator(args, process.env)
    .then(() => {
      cb();
    })
});

gulp.task('docs:preview', ['docs:build'], function () {
  /**
   * Remove the line gulp.src('README.adoc')
   * This is placeholder code to follow the gulp-connect
   * example. Could not make it work any other way.
   */
  gulp.src('README.adoc')
    .pipe(connect.reload());
})

gulp.task('docs:watch', function () {
  let dirs = ['../**/**.yml', '../**/**.adoc'];
  gulp.watch(dirs, ['docs:preview']);
});

gulp.task('docs', ['docs:connect', 'docs:watch', 'docs:build'])