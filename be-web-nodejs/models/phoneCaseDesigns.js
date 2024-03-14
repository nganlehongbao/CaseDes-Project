const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-currency").loadType(mongoose);
const Currency = mongoose.Types.Currency;

const phoneCaseDesignsSchema = new Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      required: true,
    },
    phoneBrand: {
        type: String,
        required: true,
    },
    phoneModel: {
      type: String,
      required: true,
    },
    elements: {
      type: Array,
      required: true,
    },
    price: {
      type: Currency,
      required: true,
      min: 0,
    },
    //số lượt dùng
    //chất liệu ốp
    //tên kiểU ốp
  },
  {
    timestamps: true,
  }
);
var PhoneCaseDesigns = mongoose.model("phoneCaseDesigns", phoneCaseDesignsSchema);
module.exports = PhoneCaseDesigns;