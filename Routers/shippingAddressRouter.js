const express = require("express");
const shippingAddressModel = require("../Models/shippingAddressModel.js");
const shippingRouter = express.Router();

shippingRouter.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("userId", userId);
    const addresses = await shippingAddressModel.find({ user: userId });
    console.log("_______", addresses);
    res.status(200).json(addresses);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

shippingRouter.post("/add", async (req, res) => {
  const { userId, shipping } = req.body;
  console.log(userId, "_______", shipping);
  const shippingAdress = new shippingAddressModel({
    user: userId,
    ...shipping,
  });
  if (shipping.default) {
    const changes = await shippingAddressModel.updateMany(
      { user: shipping.user },
      { $set: { default: false } }
    );
    console.log("Changes___", changes, "********");
  }
  shippingAdress.save((err, address) => {
    console.log(err, "__________", address);
    if (err) return res.status(400).json({ error: err });
    res.status(200).json(address);
  });
});

shippingRouter.put("/edit", async (req, res) => {
  const { shippingAddressId, shippingData } = req.body;
  console.log("Shipping Data", shippingData);
  try {
    if (shippingData.default) {
      const changes = await shippingAddressModel.updateMany(
        { user: shippingData.user },
        { $set: { default: false } },
        { new: true }
      );
      console.log("Changes___", changes, "********");
    }
    const shippingAddress = await shippingAddressModel.findByIdAndUpdate(
      shippingAddressId,
      shippingData,
      { new: true }
    );

    res.status(200).json(shippingAddress);
  } catch (error) {
    console.log("Error", error);
    res.status(400).json({ error: error });
  }
});

shippingRouter.delete("/delete/:shippingAddressId", async (req, res) => {
  const { shippingAddressId } = req.params;
  console.log("________)", shippingAddressId);
  shippingAddressModel.findByIdAndDelete(shippingAddressId, err => {
    console.log(err);
    if (err) res.status(400).json({ message: err });
    res.status(200).json({ message: "Deleted Successfully" });
  });
});

module.exports = shippingRouter;
