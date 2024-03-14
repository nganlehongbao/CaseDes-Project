var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");
var Role = new Schema({
 roleName: {
    type: String,
    default:"USER",
  }
});
// User.plugin(passportLocalMongoose);
module.exports = mongoose.model("Role", Role);
