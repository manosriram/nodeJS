const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Person = mongoose.model("myPerson");
const myKey = require("../setup/myurl");
const passport = require("passport");

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken("Bearer");
opts.secretOrKey = myKey.secret;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      Person.findById(jwt_payload.id)
        .then(person => {
          if (person) {
            return done(null, person);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
