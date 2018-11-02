var localStrategy = require("passport-local").Strategy;
var Person = require("./models/Person");

module.exports = passport => {
  passport.serializeUser((Person, done) => {
    done(null, Person);
  });
  passport.deserializeUser((Person, done) => {
    done(null, Person);
  });
  passport.use(
    new localStrategy(function(username, password, done) {
      Person.findOne({ username: usernmae }),
        function(err, doc) {
          if (err) {
            done(err);
          } else {
            if (doc) {
              if ((password = doc.password)) {
                done(null, {
                  username: doc.username,
                  password: doc.password
                });
              }
            }
          }
        };
    })
  );
};
