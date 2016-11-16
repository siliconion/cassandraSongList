const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const babelify = require('babelify');
// const browserify = require('browserify-middleware');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const morgan = require('morgan');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('./passport');
const db = require('./db');
const routes = express.Router()

const auth = process.env.CLIENT_ID;

const app = express();
const serverUrl = process.env.PORT || 8000;
const serverMessage = `Listening on port: ${serverUrl}`;

/*
  ****************
  Middleware calls
  ****************
*/
app.use(morgan('dev'));   // show requests in console
app.use(bodyParser.json());
app.use(cookieParser());
// initialize passport
app.use(session({secret: 'secret', cookie: {}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash())
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../assets')));

//
// Provide a browserified file at a specified path
//
// routes.get('/app-bundle.js',
//   browserify('./client/app.js', {
//     // Bundles all client-side es6, JSX, and CSS/SCSS/SASS
//     transform: ['babelify', 'scssify'],
//   })
// )

//
// Example endpoint (also tested in test/server/index_test.js)
//
routes.get('/api/tags-example', function(req, res) {
  res.send(['node', 'express', 'browserify', 'react', 'sass'])
})

//
// Static assets (html, etc.)
//
var assetFolder = path.resolve(__dirname, '../client/public')
routes.use(express.static(assetFolder))


if (process.env.NODE_ENV !== 'test') {
  //
  // The Catch-all Route
  // This is for supporting browser history pushstate.
  // NOTE: Make sure this route is always LAST.
  //
  routes.get('/*', function(req, res){
    res.sendFile( assetFolder + '/index.html' )
  })

  // Parse incoming request bodies as JSON
  // app.use( require('body-parser').json() )

  // Mount our main router
  app.use('/', routes)

  // Start the server!
  var port = process.env.PORT || 4000
  app.listen(port)
  console.log("Listening on port", port)
}
else {
  // We're in test mode; make this file importable instead.
  module.exports = routes
}
