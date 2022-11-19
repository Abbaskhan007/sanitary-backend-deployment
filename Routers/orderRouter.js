const e = require("express");
const express = require("express");
const orderModel = require("../Models/orderModel");
const productModel = require("../Models/productModel");
const storeModel = require("../Models/storeModel");
const orderRouter = express.Router();

orderRouter.post("/create", async (req, res) => {
  console.log("Req body", req.body);
  const newOrder = new orderModel(req.body);
  newOrder.save((err, data) => {
    console.log(err, data);
    if (err) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(200).json({ message: "Order Created Successfully", data });
    }
  });
});
//,,,,
orderRouter.get("/getOrder/:orderId", async (req, res) => {
  console.log("__________");
  try {
    const { orderId } = req.params;

    const order = await orderModel
      .findById(orderId)
      .populate("customerId")
      .populate("productId")
      .populate("shippingAddress")
      .populate({
        path: "productId",
        populate: {
          path: "store",
          model: "Store",
        },
      })
      .populate({
        path: "productId",
        populate: {
          path: "seller",
          model: "Seller",
        },
      });
    console.log("Order: ", order);
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

orderRouter.get("/myOrders/:userId", async (req, res) => {
  let { status } = req.query;
  let { userId } = req.params;

  console.log("Status: ", status);
  try {
    if (status === "all") {
      const orders = await orderModel
        .find({ customerId: userId })
        .populate("customerId")
        .populate("productId")
        .populate("storeId");
      res.status(200).json(orders);
    } else {
      const orders = await orderModel
        .find({ status: status, customerId: userId })
        .populate("customerId")
        .populate("productId")
        .populate("storeId");
      res.status(200).json(orders);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

orderRouter.get("/getOrders/:status", async (req, res) => {
  let { status } = req.params;

  console.log("Status: ", status);
  try {
    if (status === "all") {
      const orders = await orderModel
        .find({})
        .populate("customerId")
        .populate("productId")
        .populate("storeId");
      res.status(200).json(orders);
    } else {
      const orders = await orderModel
        .find({ status: status })
        .populate("customerId")
        .populate("productId")
        .populate("storeId");
      res.status(200).json(orders);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

orderRouter.get("/sellerOrders/:sellerId", async (req, res) => {
  let { status } = req.query;
  let { sellerId } = req.params;

  console.log("Status: ", status);
  try {
    if (status === "all") {
      const orders = await orderModel
        .find({ sellerId })
        .populate("customerId")
        .populate("productId")
        .populate("storeId");
      res.status(200).json(orders);
    } else {
      const orders = await orderModel
        .find({ status: status, sellerId })
        .populate("customerId")
        .populate("productId")
        .populate("storeId");
      res.status(200).json(orders);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

orderRouter.put("/rate", (req, res) => {
  const { orderId } = req.body;
  const body = req.body;
  console.log(orderId, body);
  orderModel
    .findByIdAndUpdate(orderId, body, { new: true })
    .populate("customerId")
    .populate("productId")
    .populate("storeId")
    .populate("shippingAddress")
    .populate("productId.store")
    .populate("productId.seller")
    .then(async (data, err) => {
      console.log(err, data);
      if (err) {
        return res.status(400).json(err);
      } else {
        const { rating, ratings } = data.productId;
        console.log();
        const newRating = (rating + body.rating) / (ratings.length + 1);
        console.log(rating, body.rating, ratings, newRating);
        const updateProduct = await productModel.findByIdAndUpdate(
          data.productId._id,
          {
            rating: newRating,
            $push: {
              ratings: body.rating,
              reviews: {
                message: body.review,
                user: data.customerId._id,
                rating: body.rating,
              },
            },
          },

          { new: true }
        );

        console.log(
          "------------------ checking",
          data.storeId.rating,
          ",",
          data.storeId.ratings?.length,
          ",",
          body.rating,
          ",",
          data.storeId
        );

        const storeNumRating =
          (parseInt(data.storeId.rating) *
            parseInt(data.storeId.ratings.length) +
            parseInt(body.rating)) /
          (parseInt(data.storeId.ratings.length) + 1);
        console.log("Num Rating-----", storeNumRating);

        const updateStore = await storeModel.findByIdAndUpdate(
          data.storeId._id,
          {
            rating: storeNumRating.toFixed(1),
            $push: {
              ratings: body.rating,
            },
          }
        );

        console.log("New Products", updateProduct);
        return res.status(200).json(data);
      }
    });
});

orderRouter.post("/getReviews", async (req, res) => {
  try {
    const body = req.body;
    console.log("Body", body);
    const reviews = await orderModel
      .find({ ...body, rating: { $gt: 0 } })
      .populate("productId")
      .populate("customerId")
      .populate("storeId");

    console.log("Reviews", reviews);
    res.status(200).json(reviews);
  } catch (err) {
    res.status(400).json(err);
  }
});

orderRouter.put("/updateOrder", async (req, res) => {
  const { orderId, status, storeId } = req.body;
  try {
    if (status === "Delivered") {
      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        {
          status,
          deliveredAt: Date.now(),
        },
        { new: true }
      );
      const updateStore = await storeModel.findByIdAndUpdate(storeId, {
        $inc: { orderDelivered: 1 },
      });
      console.log("------------", updateStore);
      console.log("Updated Order: ", updatedOrder);
      res.status(200).json(updatedOrder);
    } else {
      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        {
          status,
        },
        { new: true }
      );
      console.log("Updated Order: ", updatedOrder);
      res.status(200).json(updatedOrder);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = orderRouter;
