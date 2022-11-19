const express = require("express");
const orderModel = require("../Models/orderModel");
const sellerModel = require("../Models/sellerModel");
const sellerRouter = express.Router();
const mongoose = require("mongoose");

sellerRouter.post("/createSeller", async (req, res) => {
  const sellerData = req.body;

  const checkSeller = await sellerModel.findOne({ user: sellerData.user });
  console.log("//////", sellerData, "////", checkSeller);
  if (checkSeller) {
    res.status(469).send({ message: "The user is already the seller" });
  } else {
    const seller = new sellerModel(sellerData);
    seller.save((err, data) => {
      if (err) throw err;
      res.send(data);
    });
  }
});

sellerRouter.get("/getSeller/:userId", async (req, res) => {
  const { userId } = req.params;
  const seller = await sellerModel.findOne({ user: userId });
  if (seller) {
    res.status(200).json(seller);
  } else {
    res.status(400).json({ message: "Seller not found" });
  }
});

sellerRouter.get("/getSales/:sellerId", async (req, res) => {
  console.log("------------- 1 2 3 4 5");
  const { sellerId } = req.params;
  console.log("Seller Id", sellerId);
  const sales = await orderModel
    .aggregate()
    .match({ sellerId: mongoose.Types.ObjectId(sellerId) })
    .group({
      _id: { month: { $month: { $toDate: "$createdAt" } } },
      sales: { $sum: "$amount" },
    })
    .sort("_id.month");

  const blockchainSales = await orderModel
    .aggregate()
    .match({
      sellerId: mongoose.Types.ObjectId(sellerId),
      paymentMethod: "blockchain",
    })
    .group({
      _id: {
        month: { $month: { $toDate: "$createdAt" } },
      },
      sales: { $sum: "$amount" },
    })
    .sort("_id.month");

  const bankSales = await orderModel
    .aggregate()
    .match({
      sellerId: mongoose.Types.ObjectId(sellerId),
      paymentMethod: "bank",
    })
    .group({
      _id: {
        month: { $month: { $toDate: "$createdAt" } },
      },
      sales: { $sum: "$amount" },
    })
    .sort("_id.month");

  const bankOrders = await orderModel
    .find({
      sellerId,
      paymentMethod: "bank",
    })
    .populate("productId");

  const blockchainOrders = await orderModel
    .find({
      sellerId,
      paymentMethod: "blockchain",
    })
    .populate("productId");

  const totalSellerSales = await orderModel
    .aggregate()
    .match({
      sellerId: mongoose.Types.ObjectId(sellerId),
    })
    .group({
      _id: null,
      sales: { $sum: "$amount" },
    })
    .sort("_id.month");

  if (sales) {
    res.status(200).json({
      totalSales: sales,
      blockchainSales,
      bankSales,
      bankOrders,
      blockchainOrders,
      totalSellerSales,
    });
  } else {
    res.status(400).json({ message: "Sales not found" });
  }
});

module.exports = sellerRouter;
