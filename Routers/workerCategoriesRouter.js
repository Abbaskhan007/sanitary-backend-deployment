const express = require("express");
const workerCategoriesModel = require("../Models/workerCategoriesModel");
const workerCategoriesRouter = express.Router();

workerCategoriesRouter.get("/", async (req, res) => {
  try {
    const categories = await workerCategoriesModel.find({}, "-_id");
    console.log("Categories worker", categories);
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = workerCategoriesRouter;
