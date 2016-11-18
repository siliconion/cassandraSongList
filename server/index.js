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
// initialize passport
app.use(session({secret: 'kitty kity', cookie: {}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.static(path.join(__dirname, '../assets')));

/*
  *******************
  ROUTING STARTS HERE
  *******************
*/

/*
  *******************************************
  Browserify and Babelify all files for React
  *******************************************
*/

app.get('/app-bundle.js',
  browserify(path.join(__dirname, '../client/app.js'), {
    transform: [[babelify, { presets: ['es2015', 'react'] }]],
  })
);

/*
  ***********************************************************************
  Initializes interface.

  Response object:  Index.html file
  ***********************************************************************
*/

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/public/Index.html'));
});

/*
  ***********************************************************************
  Auth through passport

  Response object:  user onject if success, 500 with error string if fail
  ***********************************************************************
*/

app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err); // Error 500
        }
        if (!user) {
            //Authentication failed
            return res.status(401).send(info); 
        }
        //Authentication successful
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
            //Authentication failed
            return res.status(401).send(info); 
        }
        //Authentication successful
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.status(200).send(user);
        });
    })(req, res, next);
}); 

app.get('/songlist', isLoggedIn, function(req, res){
  console.log("get song list", req.user)
  db.getSongList(req.user.username, (err, data) => {
    console.log(data);
    res.send(data.rows);
  })
});

app.post('/songlist', isLoggedIn, function(req, res){
  console.log("post to song list", req.user)
  db.addSong(req.user.username, req.songInfo, (err) => {
    if(err){res.status(500).send()}
    db.getSongList(req.user, (err, data) => {
      console.log(data);
      res.send(data.rows);
    })
  })
});

app.delete('/songlist', isLoggedIn, function(req, res){
  console.log("delete to song list", req.user.usernames)
  db.removeSong(req.user.username, req.songInfo,(err) => {
    if(err){res.status(500).send()}
    db.getSongList(req.user, (err, data) => {
      console.log(data);
      res.send(data.rows);
    })
  })
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  }
  res.status(401).send("you shall not pass");
}

/*
  *******************************************************************
  Spin up server on either NODE environmental variable or 8000(local)
  *******************************************************************
*/

app.listen(serverUrl);
console.log(`Listening on port: ${serverUrl}`);
