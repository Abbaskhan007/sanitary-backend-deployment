const express = require("express");
const categoryModel = require("../Models/categoryModel");
const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res) => {
  try {
    const categories = await categoryModel.find({}, "-_id");
    console.log("Categories", categories);
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = categoryRouter;
