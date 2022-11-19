const mongoose = require("mongoose");

const sellerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    categories: [String],
    store: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    rating: { type: Number, default: 0 },
    orderDelivered: {
      type: Number,
      default: 0,
    },
    orderCancelled: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    contractAddress: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

const sellerModel = mongoose.model("Seller", sellerSchema);
module.exports = sellerModel;
