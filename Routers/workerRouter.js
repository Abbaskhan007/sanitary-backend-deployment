const express = require("express");
const userModel = require("../Models/userModels");
const workerModel = require("../Models/workerModel");
const workerRouter = express.Router();

workerRouter.post("/createWorker", async (req, res) => {
  console.log("Creating Worker Body", req.body);
  const worker = new workerModel(req.body);
  worker.save((err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

workerRouter.get("/getWorkers/:workerId", async (req, res) => {
  const { workerId } = req.params;
  const worker = await workerModel
    .findById(workerId)
    .populate("user")
    .populate("feedback.user");
  if (!worker) {
    res.send({ message: "Worker not found" });
  } else {
    console.log("Worker", worker);
    res.send(worker);
  }
});

workerRouter.get("/getWorkers", async (req, res) => {
  const worker = await workerModel.find({}).populate("user");
  res.send(worker);
});

workerRouter.post("/filterWorkers", async (req, res) => {
  console.log("Worker Filter Body ******", req.body);
  const { city, categories, min, max } = req.body;
  if (categories.length > 0) {
    const filterWorkers = await workerModel.find({
      city: { $regex: city, $options: "i" },
      price: { $gte: min, $lte: max },
      category: { $in: categories },
    });
    console.log("Filtered Workers");
    res.status(200).send(filterWorkers);
  } else {
    const filterWorkers = await workerModel.find({
      city: { $regex: city, $options: "i" },
      price: { $gte: min, $lte: max },
    });
    console.log("Filtered Workers");
    res.status(200).send(filterWorkers);
  }
});

module.exports = workerRouter;
