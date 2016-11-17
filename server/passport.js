const LocalStrategy   = require('passport-local').Strategy;
const db = require('./db');
const bcrypt   = require('bcrypt-nodejs');

var passport = require('passport');

/*
  ***********************************************************************

  Passport config for local sing in

  ***********************************************************************
*/
passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("LocalStrategy sign in")
    db.findUser(username, (err, data) => {
      console.log('passport sign in ', err, data);
      if (!data || data.rowLength === 0) {
          //return done(null, false, { message: 'Incorrect username.' });
          return done('Incorrect username.', false);
        }
        console.log('passport sign in user pass', data.rows[0], data.rows[0].hashed_pass)
        if (!bcrypt.compareSync(password, data.rows[0].hashed_pass)) {
          return done('Incorrect password.', false);
        }
        return done(null, data.rows[0]);
    });
  }
));

/*
  ***********************************************************************

  Passport config for local sing up

  ***********************************************************************
*/
passport.use('local-signup', new LocalStrategy({
        passReqToCallback : true 
    },
  function(req, username, password, done) {
    process.nextTick(function() {

    console.log("LocalStrategy sign up")
      return db.findUser(username, (err, data) => {
        console.log("passport sign up database read", err, data)
        if(data || data.rowLength > 0){
          console.log("username already taken")
          return done('That username is already taken.', false);
        } else {
          console.log('lets sign up!');
          let hashPassword =  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
          db.addUser(username, hashPassword, (err, data)=> {
            console.log('db adding user!', err, data, data.rows)
            if(err){
              return done(err, false)
            }
            return done(null, data.rows[0]); 
          })
        }
      })
    })
  })
);

/*
  ***********************************************************************

  Passport config: only save username as session info.

  ***********************************************************************
*/
passport.serializeUser(function (user, done) {
  console.log("serialize", user);
    done(null, user.username);
});

passport.deserializeUser(function(user, done) {
  console.log("DESERIALIZE", JSON.stringify(user));
    db.findUser(user, (err, data) => {
      done(err, data.rows[0]);
    });
    //done(user);
});


module.exports = passport;