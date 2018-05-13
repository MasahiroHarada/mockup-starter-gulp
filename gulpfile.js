const gulp = require('gulp')

const { paths } = require('./tasks/config')
const { reload, serve } = require('./tasks/server')
const clean = require('./tasks/clean')
const scripts = require('./tasks/scripts')
const styles = require('./tasks/styles')
const templates = require('./tasks/templates')

/**
 * ファイルの変更を監視
 */
function watch () {
  gulp.watch(paths.styles.src, gulp.series(styles, reload))
  gulp.watch(paths.scripts.watch, gulp.series(scripts, reload))
  gulp.watch(paths.templates.watch, gulp.series(templates, reload))
}

gulp.task('dev', gulp.series(
  clean, gulp.parallel(styles, templates, scripts), serve, watch
))

gulp.task('build', gulp.series(
  clean, gulp.parallel(styles, templates, scripts)
))
