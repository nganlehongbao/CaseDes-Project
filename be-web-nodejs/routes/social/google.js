var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const Role = require("../../models/role");
var userServices = require("../../service/user");

function loginWithGoogle() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, cb) {
        Role.findOne({ roleName: "USER" })
          .then(async (foundRole) => {
            let user = {
              googleId: profile.id,
              firstName: profile.name.familyName,
              lastName: profile.name.givenName,
              email: profile.emails ? profile.emails[0].value : "",
              imgAvt: profile.photos ? profile.photos[0].value : null,
              typeRegist: profile.provider,
              role: foundRole._id,
            };
            try {
              user = await userServices.upsert(user);
            } catch (error) {
              throw new Error(error);
            }
            return cb(null, user);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    )
  );
}

module.exports = loginWithGoogle;
