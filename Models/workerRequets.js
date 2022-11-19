const mongoose = require("mongoose");

const WorkerRequestSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "user",
    },
    city: {
      type: String,
      required: true,
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

  { timestamps: true }
);

const workerRequests = mongoose.model("Worker_Request", WorkerRequestSchema);

module.exports = workerRequests;
