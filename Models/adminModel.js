const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      unique: true,
      ref: "user",
    },
    workerRequests: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          unique: true,
          ref: "user",
        },
        description: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        categories: {
          type: [String],
          required: true,
        },
        images: [String],
      },
    ],
    sellerRequests: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          unique: true,
          ref: "user",
        },
        description: {
          type: String,
          required: true,
        },
        categories: {
          type: [String],
          required: true,
        },
      },
    ],
    blockUsers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
      },
    ],
  },
  { timestamps: true }
);

const adminModel = mongoose.model("admin", adminSchema);

module.exports = adminModel;
