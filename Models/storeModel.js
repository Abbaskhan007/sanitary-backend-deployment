const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: [{ type: String, required: true }],
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    ratings: [{ type: Number, default: [] }],
    rating: {
      type: Number,
      default: 0,
    },
    orderDelivered: {
      type: Number,
      default: 0,
    },
    orderCancelled: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const storeModel = mongoose.model("Store", storeSchema);

module.exports = storeModel;
