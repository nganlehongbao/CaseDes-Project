var passport = require("passport");
var FacebookStrategy = require("passport-facebook");

var userServices = require("../../service/user");

function loginWithFacebook() {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ["id", "displayName", "photos", "email"],
      },
      async function (accessToken, refreshToken, profile, cb) {
        let user = {
          facebookId: profile.id,
          firstName: profile.name.familyName || profile.displayName,
          lastName: profile.name.givenName,
          email: profile.emails ? profile.emails[0].value : "",
          imgAvt: profile.photos ? profile.photos[0].value : null,
          typeRegist: profile.provider,
          role: "65f26343235a6434cb0a62f2"
        };
        try {
          user = await userServices.upsert(user);
        } catch (error) {
          throw new Error(error);
        }
        return cb(null, user);
      }
    )
  );
}
module.exports = loginWithFacebook;
