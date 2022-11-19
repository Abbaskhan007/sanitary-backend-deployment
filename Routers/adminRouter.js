const adminModel = require("../Models/adminModel");
const express = require("express");
const adminRouter = express.Router();

adminRouter.post("/sendWorkerRequest", async (req, res) => {
  const workerData = req.body;
  console.log("WorkerData", workerData)
  const workerRequest = new adminModel({workerRequest: workerData});
  workerRequest.save((err, data) => {
    if (err) {
      res.send({ message: err.message });
    } else {
      res.send(data);
    }
  });
});

module.exports = adminRouter;
