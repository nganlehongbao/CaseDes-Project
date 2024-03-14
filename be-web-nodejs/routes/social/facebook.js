var passport = require("passport");
var FacebookStrategy = require("passport-facebook");
const Role = require("../../models/role");
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
         Role.findOne({ roleName: "USER" })
          .then(async(foundRole) => {
            let user = {
              facebookId: profile.id,
              firstName: profile.name.familyName || profile.displayName,
              lastName: profile.name.givenName,
              email: profile.emails ? profile.emails[0].value : "",
              imgAvt: profile.photos ? profile.photos[0].value : null,
              typeRegist: profile.provider,
              role: foundRole._id
            };
            try {
              user = await userServices.upsert(user);
            } catch (error) {
              throw new Error(error);
            }
            return cb(null, user);
          })
          .catch((error) => {
            res.status(500).json({ error: error.message });
          });
        
      }
      
    )
  );
}
module.exports = loginWithFacebook;
