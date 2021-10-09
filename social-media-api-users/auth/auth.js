//middleware to check if user is logged in
var ensureAuth = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ message: "You are not authorized" });
  }
};

module.exports = { ensureAuthenticated: ensureAuth };
