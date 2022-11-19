const mongoose = require("mongoose");

const WorkerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    category: [String],
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [{ type: String }],
    rating: {
      type: Number,
      default: 0,
    },
    projectsCompleted: {
      type: Number,
      default: 0,
    },
    projectCancelled: {
      type: Number,
      default: 0,
    },
    feedback: [
      {
        message: String,
        user: {
          type: mongoose.Types.ObjectId,
          ref: "user",
        },
        rating: Number,
      },
    ],
  },
  { timestamps: true }
);

const workerModel = mongoose.model("Worker", WorkerSchema);

module.exports = workerModel;
