const workerRequestModel = require("../Models/workerRequets");
const express = require("express");
const userModel = require("../Models/userModels");
const workerRequestRouter = express.Router();

workerRequestRouter.get("/", async (req, res) => {
  const requests = await workerRequestModel.find({}).populate("user");
  res.status(200).json(requests);
});

workerRequestRouter.post("/sendWorkerRequest", async (req, res) => {
  const workerData = req.body;
  console.log("WorkerData", workerData);
  const workerRequest = new workerRequestModel(workerData);
  workerRequest.save((err, data) => {
    if (err) {
      res.status(409).json({ message: "Worker Already exist" });
    } else {
      res.status(200).send(data);
    }
  });
});

workerRequestRouter.put("/acceptRequest", async (req, res) => {
  console.log(req.body);
  const { requestId, userId } = req.body;
  userModel.findByIdAndUpdate(
    userId,
    {
      $set: { isWorker: true },
    },
    { new: true },
    async (err, user) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        const requests = await workerRequestModel.findOneAndRemove(
          { _id: requestId },
          { new: true }
        );

        res.status(200).json(requests);
      }
    }
  );
});

workerRequestRouter.put("/rejectRequest", async (req, res) => {
  console.log(req.body);
  const { requestId } = req.body;

  const requests = await workerRequestModel.findOneAndRemove(
    { _id: requestId },
    { new: true }
  );

  res.status(200).json(requests);
});

module.exports = workerRequestRouter;
