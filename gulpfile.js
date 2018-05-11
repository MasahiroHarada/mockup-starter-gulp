const gulp = require('gulp')
const browserSync = require('browser-sync')
const sass = require('gulp-sass')
const plumber = require('gulp-plumber')
const rename = require('gulp-rename')
const tap = require('gulp-tap')
const path = require('path')
const fs = require('fs')
const edge = require('edge.js')
const del = require('del')

const server = browserSync.create()

const paths = {
  styles: {
    src: 'src/sass/*.scss',
    dest: 'public/styles'
  },
  templates: {
    dir: 'src/templates',
    src: 'src/templates/pages/**/*.edge',
    watch: [
      'src/templates/**/*.edge',
      'src/templates/data/*.json'
    ],
    data: 'src/templates/data.json',
    dest: 'public'
  }
}

const clean = () => del(['public'])

function reload (done) {
  server.reload()
  done()
}

function serve (done) {
  server.init({
    server: {
      baseDir: './public'
    }
  })
  done() 
}

function styles () {
  return gulp.src(paths.styles.src)
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest(paths.styles.dest))
}

function templates () {
  edge.registerViews(path.join(__dirname, paths.templates.dir))
  const data = JSON.parse(fs.readFileSync(paths.templates.data, 'utf8'))
  return gulp.src(paths.templates.src)
    .pipe(plumber())
    .pipe(tap(file => {
      const contents = edge.renderString(String(file.contents), data)
      file.contents = new Buffer(contents)
    }))
    .pipe(rename({ extname: '.html' }))
    .pipe(gulp.dest(paths.templates.dest))
}

function watch () {
  gulp.watch(paths.styles.src, gulp.series(styles, reload))
  gulp.watch(paths.templates.watch, gulp.series(templates, reload))
}

gulp.task('dev', gulp.series(
  clean, gulp.parallel(styles, templates), serve, watch
))
