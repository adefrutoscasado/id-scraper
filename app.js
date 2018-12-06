var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

const livereload = require('livereload')
const livereloadMiddleware = require('connect-livereload')
const fs = require('fs')

// Create a livereload server
const hotServer = livereload.createServer({
  // Reload on changes to these file extensions.
  exts: [ 'json', 'pug', 'css', 'js' ],
  // Print debug info
  debug: false
})

// Specify the folder to watch for file-changes.
hotServer.watch(__dirname)

var app = express()

// Inject the livereload script tag into pages.
app.use(livereloadMiddleware())

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

var indexRouter = require('./routes/index')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
