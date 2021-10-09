var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var cors = require("cors");
var params = require("./params/params");
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var passport = require("passport");

var usersRouter = require("./routes/users");
var setUpPassport = require("./setuppassport");

var app = express();

mongoose
  .connect(params.DATABASECONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log("Database connection error: " + e);
  });

const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: "sessions",
});

app.use(
  session({
    secret: params.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);

setUpPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.body);
  console.log(req.session);
  console.log(req.user);
  next();
});

app.use("/users", usersRouter);


app.get("/", (req, res) => {
  res.redirect("/posts");
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
module.exports = app;
