require("dotenv").config();
const express = require("express");
const productRouter = require("./Routers/productRouter");
const userRouter = require("./Routers/userRouter");
const cartRouter = require("./Routers/cartRouter");
const mongoose = require("mongoose");
const sellerRouter = require("./Routers/sellerRouter");
const storeRouter = require("./Routers/storeRouter");
const workerRouter = require("./Routers/workerRouter");
const workerRequestRouter = require("./Routers/workerRequestRouter");
const sellerRequestRouter = require("./Routers/sellerRequestRouter");
const categoryRouter = require("./Routers/categoryRouter");
const workerCategoriesRouter = require("./Routers/workerCategoriesRouter");
const shippingRouter = require("./Routers/shippingAddressRouter");
const orderRouter = require("./Routers/orderRouter");
const bannerModel = require("./Models/bannerModel");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

console.log("PROCESS--", process.env.STRIPE_SECRET_KEY);

try {
  mongoose
    .connect(
      "mongodb://Abbas:Abikhan123@ac-y5ddmjs-shard-00-00.glggci4.mongodb.net:27017,ac-y5ddmjs-shard-00-01.glggci4.mongodb.net:27017,ac-y5ddmjs-shard-00-02.glggci4.mongodb.net:27017/?ssl=true&replicaSet=atlas-4tw3k1-shard-0&authSource=admin&retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
      }
    )
    .then(() => console.log("Connected to mongodb"));
} catch (err) {
  console.log("Error:  ", err);
}

app.get("/api/config", (req, res) => {
  console.log("__________________________________");
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.get("/api/banners", async (req, res) => {
  try {
    const banners = await bannerModel.find();
    res.status(200).json(banners);
  } catch (err) {
    res.status(401).send({ message: err.message });
  }
});

app.post("/api/pay", async (req, res) => {
  try {
    const orderData = req.body;
    console.log("Order Data", orderData);
    if (!orderData) {
      return res.status(500).send({ message: "Please make the order first" });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseFloat(orderData.amount).toFixed(2) * 100,
      payment_method_types: ["card"],
      metadata: orderData,
      currency: "PKR",
    });
    const clientSecret = paymentIntent.client_secret;
    res.status(200).json({ message: "Payment Initiated", clientSecret });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.use("/api/categories", categoryRouter);
app.use("/api/workerCategories", workerCategoriesRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/stores", storeRouter);
app.use("/api/worker", workerRouter);
app.use("/api/workerRequests", workerRequestRouter);
app.use("/api/sellerRequests", sellerRequestRouter);
app.use("/api/orders", orderRouter);
app.use("/api/shippingAddress", shippingRouter);

if (process.env.NODE_ENV == "production") {
  app.use(express.static("frontend/build"));

  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 5000, () =>
  console.log("Server running at port 5000")
);
