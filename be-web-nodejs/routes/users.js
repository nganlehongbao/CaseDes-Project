var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var User = require("../models/users");
var passport = require("passport");
router.use(bodyParser.json());
var authenticate = require("../authenticate");
const cors = require("./cors");
const bcrypt = require("bcrypt");
const { JSONCookie } = require("cookie-parser");
const Role = require("../models/role");
router.get(
  "/",
  cors.cors,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  (req, res, next) => {
    User.find({})
      .then(
        (user) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(user);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  }
);
router.post("/register", cors.corsWithOptions, (req, res, next) => {
  const { firstName, lastName, email, phone, passwords } = req.body;

  const searchCondition = {};
  if (email !== "") {
    searchCondition.email = email;
  }
  if (phone !== "") {
    searchCondition.phoneNumber = phone;
  }

  User.findOne(searchCondition)
    .then((existingUser) => {
      if (existingUser !== null) {
        return res
          .status(400)
          .json({ error: "Email or phone already exists." });
      } else {
        bcrypt.hash(passwords, 10, (err, hash) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "Error hashing the password." });
          }
          Role.findOne({ roleName: "USER" })
            .then((foundRole) => {
              const newUser = new User({
                firstName,
                lastName,
                email,
                phoneNumber: phone,
                passwords: hash,
                role: foundRole._id,
              });
              newUser
                .save()
                .then((user) => {
                  const token = authenticate.getToken({ _id: user._id });
                  const infoUser = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    imgAvt: user.imgAvt,
                  };
                  res.statusCode = 200;
                  res.setHeader("Content-Type", "application/json");
                  res.json({
                    success: true,
                    token: token,
                    status: "Login Successful!",
                    info: infoUser,
                    userId: user._id,
                  });
                })
                .catch((error) => {
                  res.status(500).json({ error: error.message });
                });
            })
            .catch((error) => {
              res.status(500).json({ error: error.message });
            });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/login", cors.corsWithOptions, (req, res, next) => {
  const loginValue = req.body.emailOrPhone;
  function isEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }
  const loginField = isEmail(loginValue) ? "email" : "phoneNumber";
  User.findOne({ [loginField]: loginValue })
    .then((user) => {
      bcrypt.compare(req.body.passwords, user.passwords, (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Error comparing passwords." });
        }
        if (!result) {
          return res.status(401).json({
            success: false,
            message: "Authentication failed",
            info: "Invalid password",
          });
        }

        if (!user) {
          return res.status(401).json({
            success: false,
            message: "Authentication failed",
            info: "User not found",
          });
        }
        var token = authenticate.getToken({ _id: user._id });
        const infoUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          imgAvt: user.imgAvt,
          admin: user.admin,
        };
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({
          success: true,
          token: token,
          status: "Login Successful!",
          info: infoUser,
          userId: user._id,
        });
      });
    })
    .catch((err) => {
      next(err);
    });
});
router.get("/logout", (req, res) => {
  console.log("Sesss", req.session);
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    delete req.headers.authorization;
    res.json({ success: true, status: "Logout Successful!" });
  } else {
    var err = new Error("You are not logged in!");
    err.status = 403;
    next(err);
  }
});
router.put("/reset-password/:userId", cors.corsWithOptions, async (req, res,next) => {
  const { passwords } = req.body;
  User.findById({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ error: "User Not Found" });
      }
      bcrypt.hash(passwords, 10, async (err, hash) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error hashing the password." });
        }
        user.passwords = hash,
          await user.save().then((users) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
              success: true,
              status: `Passwor has reset successfully `,
              redirectUrl: `http://localhost:3000/login`
            });
          }).catch((err) => next(err))
      });

    }).catch((err) => next(err));
});


module.exports = router;
