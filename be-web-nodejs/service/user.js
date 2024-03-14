var User = require("../models/users");

async function upsert(userInfo) {
  let user = null;
  try {
    console.log(userInfo);
    user = await User.findOne({
      $or: [
        { facebookId: userInfo.facebookId },
        { googleId: userInfo.googleId },
      ],
    });
    console.log(user);
    if (!user) {
      user = await User.create(userInfo);
    }
  } catch (error) {
    console.log(error);
  }
  return user;
}

module.exports = {
  upsert,
};
