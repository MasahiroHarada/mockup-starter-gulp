const edge = require('edge.js')

edge.global('scoreEmoji', function (score) {
  if (score > 90) return this.safe('<span>😄</span>')
  if (score >= 60) return this.safe('<span>🙂</span>')
  return this.safe('<span>😓</span>')
})

edge.global('sample', function () {
  return this.safe('<p>hey</p>')
})
