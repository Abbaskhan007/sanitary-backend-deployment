const express = require("express");
const { default: mongoose } = require("mongoose");
const cartModel = require("../Models/cartModel");

const router = express.Router();

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const userCart = await cartModel
    .findOne({ user: userId })
    .populate({
      path: "products",
      populate: {
        path: "product",
      },
    })
    .select({ products: 1, _id: 0 });
  res.send(userCart);
});

router.post("/addToCart", async (req, res) => {
  const cartData = req.body;
  console.log(
    "Req.body*******************************************************************",
    cartData
  );
  const checkUser = await cartModel.findOne({ user: cartData.user }); //checking if the user cart is already created in the database or not

  // if the user's cart already exist then check if the product is present in the user cart or not

  if (checkUser) {
    const checkProduct = checkUser.products.find(
      prd => prd.product._id.toString() == cartData.products.product
    );

    // if the product is already exist then increment the quantity of that product

    if (checkProduct) {
      const updatedCart = await cartModel
        .findOneAndUpdate(
          {
            user: cartData.user,
            "products.product": cartData.products.product,
          },
          { $inc: { "products.$.quantity": cartData.products.quantity } },
          { new: true }
        )
        .populate({
          path: "products",
          populate: {
            path: "product",
          },
        })
        .select({ products: 1, _id: 0 });
      console.log("Updated Cart", updatedCart);
      res.send(updatedCart);
    } // if the product is not already exist in the user cart then simply push the product in the user cart.
    else {
      const updatedCart = await cartModel
        .findOneAndUpdate(
          { user: cartData.user },
          {
            $push: {
              products: {
                product: cartData.products.product,
                quantity: cartData.products.quantity,
              },
            },
          },

          {
            new: true,
          }
        )

        .select({ products: 1, _id: 0 })
        .populate({
          path: "products",
          populate: {
            path: "product",
          },
        });
      res.send(updatedCart);
    }
  } // if the user cart is not created before then create the user cart
  else {
    const cartItem = new cartModel(cartData);
    cartItem.save(async (err, data) => {
      if (err) {
        console.log("1", err);
        throw err;
      }

      const updatedData = await cartModel
        .findOne({ user: data.user })
        .select({ products: 1, _id: 0 })

        .populate({
          path: "products",
          populate: {
            path: "product",
          },
        });
      console.log("update Data", updatedData);
      res.send(updatedData);
    });
  }
});

router.post("/changeQuantity", async (req, res) => {
  console.log("Change Quantity", req.body);
  const updatedCart = await cartModel
    .findOneAndUpdate(
      { user: req.body.userId, "products._id": req.body.productId },
      {
        $set: { "products.$.quantity": req.body.quantity },
      },
      { new: true }
    )
    .select({ products: 1, _id: 0 })

    .populate({
      path: "products",
      populate: {
        path: "product",
      },
    });
  console.log("Updated Cart", updatedCart);
  res.send(updatedCart);
});

router.delete("/deleteProduct", async (req, res) => {
  console.log("Query params", req.query);
  const { productId, userId, quantity, product_id } = req.query;
  const updatedCart = await cartModel
    .findOneAndUpdate(
      {
        user: userId,
      },
      {
        $pull: {
          products: {
            product: productId,
          },
        },
      },
      {
        new: true,
      }
    )
    .select({ products: 1, _id: 0 })

    .populate({
      path: "products",
      populate: {
        path: "product",
      },
    });
  res.send(updatedCart);
  console.log("Updated Cart", updatedCart);
});

router.delete("/emptyCart/:userId", async (req, res) => {
  try {
    console.log("--------------------- Empty Cart");
    const userId = req.params.userId;
    const cartData = await cartModel.findOneAndDelete({ user: userId });
    console.log("-------- 2", cartData);
    res.status(200).json({ message: "Cart Empty" });
  } catch (err) {
    console.log("-------- 1", err);
    res.status(400).json(err);
  }
});

module.exports = router;
