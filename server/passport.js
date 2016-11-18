const LocalStrategy   = require('passport-local').Strategy;
const db = require('./db');
const bcrypt   = require('bcrypt-nodejs');

var passport = require('passport');

var authenticate = function(username, password, done) {
  db.findUser(username, (err, data) => {
    if(err) {return done(err)}
    if(!data || data.rowLength === 0){
      return done(null, false, "Unrecognized username")
    }
    if (!bcrypt.compareSync(password, data.rows[0].hashed_pass)) {
      return done(null, false, "Incorrect password, please try again");
    }
    return done(null, data.rows[0]);
  });
}

var signup = function(username, password, done){
  db.findUser(username, (err, data) => {
    console.log("passport sign up database read", err, data)
    if(data && data.rowLength > 0){
      return done(null, false, "This username is already taken");
    } else {
      var hashPassword =  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      db.addUser(username, hashPassword, (err)=> {
        if(err){
          return done(err, false)
        }
        authenticate(username, password, done);
      })
    }
  })
}

passport.use(new LocalStrategy(authenticate));

passport.use('local-signup', new LocalStrategy(signup));

passport.serializeUser(function (user, done) {
  // console.log("serialize", user);
    done(null, user.username);
});

passport.deserializeUser(function(user, done) {
  // console.log("DESERIALIZE", JSON.stringify(user));
    db.findUser(user, (err, data) => {
      done(err, data.rows[0]);
    });
});

module.exports = passport;