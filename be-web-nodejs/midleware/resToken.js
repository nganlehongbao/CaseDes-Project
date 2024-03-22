var authenticate = require("../authenticate");

async function resToken(req, res, next) {
  var token = authenticate.getToken({ _id: req.user._id });
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 2);
  if(req.user.lastName ===undefined){
    req.user.lastName = " "
  }
  if(req.user.firstName ===undefined){
    req.user.firstName = " "
  }
  const info = {
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    imgAvt: req.user.imgAvt,
    admin: req.user.admin,
  };
  res.cookie("token", token,{ expires: expirationDate });
  res.cookie("info", JSON.stringify(info),{ expires: expirationDate });
  res.cookie("userId", JSON.stringify(req.user._id),{ expires: expirationDate });
  res.redirect(`http://localhost:3000`);
}

module.exports = resToken;