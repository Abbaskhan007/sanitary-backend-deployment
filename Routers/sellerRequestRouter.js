const express = require("express");
const sellerRequestsModel = require("../Models/sellerRequests");
const userModel = require("../Models/userModels");

const sellerRequestRouter = express.Router();

sellerRequestRouter.get("/", async (req, res) => {
  const requests = await sellerRequestsModel.find({}).populate("user");
  res.status(200).json(requests);
});

sellerRequestRouter.post("/sendSellerRequest", (req, res) => {
  const data = req.body;
  const sellerRequest = new sellerRequestsModel(data);
  sellerRequest.save((err, data) => {
    if (err) {
      res.status(409).json({ message: "Seller Request Already Sent" });
    } else {
      res.status(200).json(data);
    }
  });
});

sellerRequestRouter.put("/acceptRequest", async (req, res) => {
  console.log(req.body);
  const { requestId, userId } = req.body;
  userModel.findByIdAndUpdate(
    userId,
    {
      $set: { isSeller: true },
    },
    { new: true },
    async (err, user) => {
      if (err) {
        res.status(500).json({ message: err.message });
      } else {
        const requests = await sellerRequestsModel.findOneAndRemove(
          { _id: requestId },
          { new: true }
        );

        res.status(200).json(requests);
      }
    }
  );
});

sellerRequestRouter.put("/rejectRequest", async (req, res) => {
  console.log(req.body);
  const { requestId } = req.body;

  const requests = await sellerRequestsModel.findOneAndRemove(
    { _id: requestId },
    { new: true }
  );

  res.status(200).json(requests);
});

module.exports = sellerRequestRouter;
