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

router.get("/", cors.cors, (req, res, next) => {
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
router.get("/:userId", cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    User.findById(req.params.userId)
        .select("firstName dob lastName address email imgAvt gender phoneNumber")
        .then((user) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ user: user });
        },
            (err) => next(err)
        )
        .catch((err) => next(err));
}
);
router.put("/:userId", cors.cors, authenticate.verifyUser, async (req, res, next) => {
    User.findByIdAndUpdate(req.params.userId, { $set: req.body })
        .then(
            (users) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                const infoUser = {
                    firstName: users.firstName,
                    lastName: users.lastName,
                    imgAvt: users.imgAvt,
                  }
                res.json({ user: users,userinfor:infoUser, success: true });
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
}
);
router.put("/change-password/:userId", cors.cors, authenticate.verifyUser, async (req, res, next) => {
    User.findById(req.params.userId)
        .then(
            (user) => {
                bcrypt.compare(req.body.oldPasswords, user.passwords, (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: "Error comparing passwords." });
                    }
                    if (!result) {
                       
                       res.json({status:401 , success: false });
                    }else{
                        res.statusCode = 200;
                        bcrypt.hash(req.body.passwords, 10, async (err, hash) => {
                            if (err) {
                                return res
                                    .status(500)
                                    .json({ error: "Error hashing the password." });
                            }
                            user.passwords = hash,
                                await user.save().then((users) => {
                                    res.statusCode = 200;
                                    res.setHeader("Content-Type", "application/json");
                                    res.json({ success: true });
                                }).catch((err) => next(err))
                        });
                    }
                   
                });
            },
            (err) => next(err)
        )
        .catch((err) => next(err));
}
);
module.exports = router;
