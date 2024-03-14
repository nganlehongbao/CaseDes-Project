var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var User = require("../models/users");
var passport = require("passport");
router.use(bodyParser.json());
var authenticate = require("../authenticate");
const cors = require("./cors");
const resToken = require("../midleware/resToken");

//Google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  resToken
);
//Facebook

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  resToken
);

module.exports = router;
