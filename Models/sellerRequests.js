const mongoose = require("mongoose");

const SellerRequestsSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      require: true,
      unique: true,
    },
    description: {
      type: String,
      require: true,
    },
    categories: {
      type: [String],
      require: true,
    },
  },

  { timestamps: true }
);

const sellerRequests = mongoose.model("Seller_Requests", SellerRequestsSchema);

module.exports = sellerRequests;
