const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const otpSchema = new Schema({
    otp: {
        type: String,
        require: true
    },
    is_verifile:{
        type: Boolean,
        default:false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    timestamp:{
        type:Date,
        default:Date.now,
        set:(timestampe)=>new Date(timestampe),
        get:(timestampe)=>timestampe.getTime()
    }
});

const Otp = mongoose.model("otps", otpSchema);

module.exports = Otp;