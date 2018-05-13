const gulp = require('gulp')
const webpack = require('webpack-stream')

const { paths } = require('./config')

/**
 * JS周りはWebpackに委譲
 */
function scripts () {
  return gulp.src(paths.scripts.src)
    .pipe(webpack(
      require('../webpack.config'),
      require('webpack')
    ))
    .pipe(gulp.dest(paths.scripts.dest))
}

module.exports = scripts
