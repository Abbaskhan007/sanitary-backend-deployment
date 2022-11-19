const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    image: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const bannerModel = mongoose.model("banner", bannerSchema);

module.exports = bannerModel;
