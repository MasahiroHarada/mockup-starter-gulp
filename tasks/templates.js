const gulp = require('gulp')
const rename = require('gulp-rename')
const tap = require('gulp-tap')
const path = require('path')
const fs = require('fs')
const edge = require('edge.js')

const { paths } = require('./config')

/**
 * Edge.js -> HTML
 */
function templates () {
  // テンプレートを読み込む
  edge.registerViews(path.join(__dirname, `../${paths.templates.root}`))

  // データファイルを読み込む
  const data = fs.existsSync(paths.templates.data)
    ? JSON.parse(fs.readFileSync(paths.templates.data, 'utf8'))
    : {}

  // ヘルパー関数を読み込む
  fs.existsSync(paths.templates.helpers) && require(`../${paths.templates.helpers}`)

  return gulp.src(paths.templates.src)
    .pipe(tap(file => {
      const contents = edge.renderString(String(file.contents), data)
      file.contents = new Buffer(contents)
    }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(paths.templates.dest))
}

module.exports = templates
