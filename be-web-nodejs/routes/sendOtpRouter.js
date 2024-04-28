var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
const User = require('../models/users');
const Otp = require("../models/Otp");
const sendEmail = require('../service/sendOtpMail');
const sendSMS = require('../service/sendOtpSMS');
var passport = require("passport");
router.use(bodyParser.json());
var authenticate = require("../authenticate");
const cors = require("./cors");
const bcrypt = require("bcrypt");

const generateOtp = async () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString();
};
// Validates email.
function validateEmail(inputValue) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(inputValue).toLowerCase());
}

// Validate number.
function validateNumber(inputValue) {
    if (inputValue.length == 10 && !isNaN(inputValue)) {
        return true;
    }
    return false;
}
router.post("/sendOtp", cors.corsWithOptions, async (req, res, next) => {
    const inputValue = req.body.emailOrPhone;
    const inputField = validateEmail(inputValue) ? "email" : "phoneNumber";
    const g_otp = await generateOtp();
    const cDate = new Date();
    User.findOne({ [inputField]: inputValue })
        .then(user => {
            if (!user) {
                return res
                .status(404)
                .json({ error: "Email or phone not exists." });
            } else {
                if (validateEmail(inputValue)) {
                    sendEmail(user.email, g_otp)
                        .then(result => {
                            Otp.findOneAndUpdate({ userId: user._id }, { otp: g_otp, is_verifile: false, timestamp: (new Date(cDate.getTime())) }, { new: true, upsert: true, setDefaultsOnInsert: true })
                                .then(() => {
                                    res.statusCode = 200;
                                    res.setHeader("Content-Type", "application/json");
                                    res.json({
                                        success: true,
                                        status: "OTP sent. Valid for only 2 minutes",
                                        emailOrPhone: user.email,
                                    });
                                    //return res.status(201).send("OTP sent. Valid for only 2 minutes");
                                })
                                .catch(err => {
                                    throw new Error(err);
                                });
                        })
                        .catch(err => {
                            throw new Error(err);
                        });
                    // } else if (validateNumber(inputValue)) {
                    //     sendSMS(user.phoneNumber, g_otp)
                    //         .then(result => {
                    //             console.log(result);
                    //             Otp.findOneAndUpdate({ otp: g_otp},{userId: user._id },{is_verifile:false,timestamp:(new Date(cDate.getTime()))},{new:true,upsert:true,setDefaultsOnInsert:true})
                    //                 .then(() => {
                    //                     return res.status(201).send("OTP sent. Valid for only 2 minutes");
                    //                 })
                    //                 .catch(err => {
                    //                     throw new Error(err);
                    //                 });
                    //         })
                    //         .catch(err => {
                    //             throw new Error(err);
                    //         });
                } else {
                    return res.status(403)
                    .json("Invalid phone/email.");
                }
            }
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});
router.post("/verify", cors.corsWithOptions, (req, res, next) => {
    const { otp, emailOrPhone } = req.body;
    // Finding the user provided OTP in the DB.
    Otp.findOne({ otp: otp })
        .then(async (foundOtp) => {
            console.log("OTP:" + foundOtp);
            if (!foundOtp) {
                return res
                    .status(404)
                    .json({ error: "Incorrect OTP" });
                //  return res.send("Incorrect OTP");
            }
            const isExist = await User.exists({ _id: foundOtp.userId });
            if (!isExist) {
                console.log("Incorrect OTP or it has been expired." )
                return res
                    .status(500)
                    .json({ error: "Incorrect OTP or it has been expired." });
            }
            // If OTP founded then finding the associated user with this OTP using userID.
            User.findById(foundOtp.userId).then(async (user) => {
                // If the current email and the email in DB matches then
                if (emailOrPhone == user.email) {
                    await Otp.findByIdAndUpdate({ _id: foundOtp._id }, { otp: null });
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({
                        success: true,
                        status: `${emailOrPhone} has been successfully verified`,
                        emailOrPhone: emailOrPhone,
                    });
                    //res.send(`${emailOrPhone} has been successfully verified`);
                    //     // If the current phoneNumber and the phoneNumber in DB matches then
                    // } else if (emailOrPhone == user.phoneNumber ) {
                    //     await Otp.findByIdAndUpdate({ _id: foundOtp._id });
                    //     res.send(`${emailOrPhone} has been successfully verified`);
                } else {
                    console.log("Incorrect OTP or it has been expired.1" )
                    return res
                        .status(500)
                        .json({ error: "Incorrect OTP or it has been expired." });
                }
            })
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });

});

module.exports = router;
