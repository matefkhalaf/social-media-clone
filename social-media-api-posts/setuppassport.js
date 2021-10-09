var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var User = require("./models/user");

module.exports =  () => {
  //turns a user object into an id
  passport.serializeUser( (user, done) => {
    //serializing the user
    done(null, user._id);
  });
  //turns the id into a user object
  passport.deserializeUser( (id, done) => {
    User.findById(id).select("-password").exec( function (err, user) {
      done(err, user);
    });
  });

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      function (email, password, done) {
          
        User.findOne({ email: email }, (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            return done(null, false, { message: "Username or password is incorrect!" });
          }
          user.checkPassword(password, (err, isMatch) => {
            if (err) {
              return done(err);
            }
            if (isMatch) {
              user.password = undefined;
              return done(null, user);
            } else {
              return done(null, false, {
                message: "Username or password is incorrect!",
              });
            }
          });
        });
      }
    )
  );
};
