var createError = require("http-errors");
var express = require("express");
//session
var session = require("express-session");
var FileStore = require("session-file-store")(session);

require("dotenv").config();
var path = require("path");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var userDetailRouter = require("./routes/userDetail");
var authRouter = require("./routes/authRouter");
var roleRouter = require("./routes/roleRouter");
var uploadRouter = require("./routes/uploadRouter");
var sendOtpRouter = require("./routes/sendOtpRouter");
const phoneCaseDesignRouter = require("./routes/phoneCaseDesignRouter");

//passport
var passport = require("passport");
var authenticate = require("./authenticate");

//token
var config = require("./config");
const cors = require("cors");
const socialAuth = require("./routes/social");

var app = express();
const url = config.mongoUrl;
const connect = mongoose.connect(url);

// //required to use session not ignore
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
//passport
//app.use(passport.initialize());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/", authRouter);

connect.then((db) => {
  console.log("Connected correctly to server");
}),
  (err) => {
    console.log(err);
  };

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/user-detail", userDetailRouter);
app.use("/role", roleRouter);
app.use("/imageUpload", uploadRouter);
app.use("/design-phone-case", phoneCaseDesignRouter);
app.use("/author", sendOtpRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

socialAuth.loginWithFacebook();
socialAuth.loginWithGoogle();
module.exports = app;
