var bcrypt = require("bcrypt");
var mongoose = require("mongoose");

const SALT_FACTOR = 10;

var userSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

// Shouldn't use arrow function as this won't be bound to calling function
userSchema.pre("save", function (next) {
  var user = this;

  // check if password is modified or not as this method "save" can be used to update doc usinf find then save
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      user.password = hashedPassword;
      next();
    });
  });
});

userSchema.methods.checkPassword = function(guess, cb) {
  if (this.password != null) {
    bcrypt.compare(guess, this.password, (err, isMatch) => {
      cb(err, isMatch);
    });
  }
};

var User = mongoose.model("users", userSchema);

module.exports = User;
