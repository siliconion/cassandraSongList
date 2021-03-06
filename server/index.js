const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const babelify = require('babelify');
const browserify = require('browserify-middleware');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const LocalStrategy = require('passport-local').Strategy;
const passport = require('./passport');
const db = require('./db');
const app = express();
const serverUrl = process.env.PORT || 4000;

/*
  ****************
  Middleware calls
  ****************
*/
app.use(morgan('dev'));   // show requests in console
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({secret: 'session secrete', cookie: {}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../client/public')));

/*
  *******************
  ROUTING STARTS HERE
  *******************
*/

// Browserify and Babelify all files for React
app.get('/app-bundle.js',
  browserify(path.join(__dirname, '../client/app.js'), {
    transform: [[babelify, { presets: ['es2015', 'react'] }], 'scssify'],
  })
);

// Auth routes
app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err); // Error 500
        }
        if (!user) {
            return res.status(401).send(info); 
        }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.status(200).send(user);
        });
    })(req, res, next);
}); 

app.get('/logout', function (req, res) {
    req.logout();
    res.send('logout success');
});

app.post('/signup', function(req, res, next) {
    passport.authenticate('local-signup', function(err, user, info) {
        if (err) {
            return next(err); // Error 500
        }
        if (!user) {
            return res.status(401).send(info); 
        }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.status(200).send(user);
        });
    })(req, res, next);
}); 

app.get('/isAuth', isLoggedIn, function(req, res){
  res.send(req.user.username);
});

// Song list routes
app.get('/songlist', isLoggedIn, function(req, res){
  db.getSongList(req.user.username, (err, data) => {
    res.send(data.rows);
  })
});

app.post('/songlist', isLoggedIn, function(req, res){
  db.addSong(req.user.username, req.body.songInfo, (err, data) => {
    if(err){
      res.status(500).send();
    } else {
      db.getSongList(req.user.username, (err, data) => {
        res.send(data.rows);
      })
    }
  })
});

app.post('/deleteSong', isLoggedIn, function(req, res){
  db.deleteSong(req.user.username, req.body.songInfo, (err, data) => {
    if(err){
      res.status(500).send();
    } else {
      db.getSongList(req.user.username, (err, data) => {
        res.send(data.rows);
      })
    }
  })
});

// Index and catch-all
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.status(401).send("you shall not pass");
}

/*
  *******************************************************************
  Spin up server
  *******************************************************************
*/

app.listen(serverUrl);
console.log(`Listening on port: ${serverUrl}`);
