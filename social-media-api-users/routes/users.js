var express = require("express");
var passport = require("passport");
var router = express.Router();

var User = require("../models/user");

router.post("/login", (req, res) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "server error" });
    }
    if (!user) {
      return res.status(401).json(info);
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "server error" });
      }
      return res.status(200).json(user);
    });
    
  })(req, res);
});

router.get("/logout", (req, res) => {
  req.logOut();
  return res.status(200).json({ message: "User logged out" });
});

router.get("/check-auth", (req, res) => {
  if(req.isAuthenticated()){
    return res.status(200).json(req.user);

  }else{
    return res.status(200).json({ message: "You are not authorized" });
  }
});

router.post("/register", (req, res) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: "server error" });
    }
    if (user) {
      return res.status(401).json({ message: "user with same e-mail exists" });
    }

    var newUser = new User({
      username: username,
      password: password,
      email: email,
    });

    newUser.save((err, user) => {
      if (err) return res.status(500).json({ message: "server error" });
      if (user) {
        req.logIn(user, (err) => {
          if (err) {
            return res.status(500).json({ message: "server error" });
          }
          user.password = undefined;
          return res.status(200).json(user);
        });
      }
    });
  });
});

module.exports = router;
