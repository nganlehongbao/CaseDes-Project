var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");
var User = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  typeRegist: {
    type: String,
    default: "Local"
  },
  address: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",

  },
  certicate: {
    type: String,
    default: "",
  },
  imgAvt: {
    type: String,
    default: "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg"
  },
  gender: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",

  },
  passwords: {
    type: String,
  },
  dob: {
    type: Date,
    default: "",
  },
  status: {
    type: String,
    default: "Active",
  },
  facebookId: {
    type: String,
    default: "",
  },
  googleId: {
    type: String,
    default: "",
  },
  role:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role', 
    required: true
  }] ,
  // transaction:[{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Transaction', 
  // }]
});
// User.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", User);
