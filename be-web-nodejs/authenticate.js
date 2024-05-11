var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var User = require("./models/users");
var Role = require("./models/role");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken");
var config = require("./config.js");
var FacebookTokenStrategy = require("passport-facebook-token");

//task1 ass3
exports.verifyAdmin = (req, res, next) => {
  if (req.user.role) {
     Role.findById(req.user.role).then((role)=>{
      if(role.roleName === "ADMIN"){
        return next();
      }else{
        const err = new Error("You are not authorized to perform this operation!");
        err.status = 403;
        return next(err);
      }
     }).catch((err) => {
      return next(err);
    });
  } else {
    const err = new Error("You are not authorized to perform this operation!");
    err.status = 403;
    return next(err);
  }
};
exports.verifyUser = (req, res, next) => {
  var token =
    req.body.token ||
    req.query.token ||
    req.headers["x-token"] ||
    req.headers.authorization.split(" ")[1];
    console.log(token)
  jwt.verify(token, config.secretKey, (verifyErr, decoded) => {
    if (verifyErr) {
      const err = new Error(
        "You are not authorized to perform this operation!"
      );
      err.status = 403;
      return next(err);
    } else {
      req.user = decoded;
      User.findOne({ _id: req.user._id })
        .then((users) => {
          req.user = users;
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return next();
        })
        .catch((err) => {
          return next(err);
        });
    }
  });
};
exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey, { expiresIn: '7d' });
};
exports.getTokenForPass = function (user) {
  return jwt.sign(user, config.secretKey, { expiresIn: 120 });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload._id })
      .exec()
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);
//exports.verifyUser = passport.authenticate('jwt', {session: false});
exports.facebookPassport = passport.use(
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,  
      clientSecret: process.env.FACEBOOK_APP_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ facebookId: profile.id })
        .then((user) => {
          if (user) {
            return done(null, user);
          } else {
            user = new User({ username: profile.displayName });
            user.facebookId = profile.id;
            user.firstname = profile.name.givenName;
            user.lastname = profile.name.familyName;
            return user.save();
          }
        })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err, false);
        });
    }
  )
);

//passport.use(new LocalStrategy(User.authenticate(), { session: false }));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
