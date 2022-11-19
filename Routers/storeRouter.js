const express = require("express");
const { mongoose } = require("mongoose");
const cartModel = require("../Models/cartModel");
const productModel = require("../Models/productModel");
const sellerModel = require("../Models/sellerModel");
const storeModel = require("../Models/storeModel");

const storeRouter = express.Router();

storeRouter.post("/createStore", async (req, res) => {
  const storeData = req.body;

  const store = new storeModel(storeData);
  store.save((err, data) => {
    if (err) throw err;
    res.status(200).json(data);
  });
});

storeRouter.get("/getStores", async (req, res) => {
  const storeData = await storeModel.find({}).populate("seller");
  res.send(storeData);
});

storeRouter.get("/getStore/:storeId", async (req, res) => {
  const { storeId } = req.params;
  const store = await storeModel
    .findById(storeId)
    .populate("seller")
    .populate({ path: "seller", populate: { path: "user", model: "user" } })
    .populate("products")
    .populate("products.reviews.user");
  if (!store) {
    res.send({ message: "Store does not exist" });
  } else {
    console.log("Store", store);
    res.send(store);
  }
});

storeRouter.get("/getStores/:seller", async (req, res) => {
  const { seller } = req.params;
  const stores = await storeModel.find({ seller }).populate("seller");
  res.status(200).json(stores);
});

storeRouter.delete("/deleteStore/:storeId", async (req, res) => {
  const { storeId } = req.params;
  storeModel.findByIdAndRemove(storeId, async (err, data) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      const sellerStore = await sellerModel.findByIdAndUpdate(data.seller, {
        $pull: { store: storeId },
      });
      console.log("Seller Store-------------", sellerStore);
      const products = await productModel.deleteMany({ _id: data.products });
      const stores = await storeModel.find({ seller: req.body.sellerId });
      console.log("products--------------------", products);
      console.log("Stores--------------------", stores);

      const storeData = await storeModel.findById(storeId);
      console.log("***************))", storeData);
      cartModel.updateMany(
        { products: { $in: storeData && storeData.products } },
        {
          $pull: {
            products: { product: { $in: storeData && storeData.products } },
          },
        },
        (err, data) => {
          console.log(err, "Data***********", data);
          if (err) {
            return res.status(400).json(err);
          }
          res.status(200).json(stores);
        }
      );

      // cartModel.updateMany(
      //   {},
      //   {
      //     $pull: {
      //       products: {
      //         "product.$.store": storeId,
      //       },
      //     },
      //   },
      //   { new: true },

      // );
    }
  });
});

storeRouter.put("/updateStore", async (req, res) => {
  const updatedStore = await storeModel.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedStore);
});

storeRouter.post("/filterStore", async (req, res) => {
  const { categories, search } = req.body;
  console.log(categories, search, req.body);
  if (categories?.length > 0) {
    const filteredStore = await storeModel.find({
      name: { $regex: search, $options: "i" },
      category: { $in: categories },
    });
    res.send(filteredStore);
  } else {
    const filteredStore = await storeModel.find({
      name: { $regex: search, $options: "i" },
    });
    res.send(filteredStore);
  }
});

module.exports = storeRouter;
