const mongoose = require("mongoose");

const workerCategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const workerCategoriesModel = mongoose.model(
  "workercategories",
  workerCategoriesSchema
);

module.exports = workerCategoriesModel;
