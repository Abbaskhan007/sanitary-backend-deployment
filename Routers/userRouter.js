const express = require("express");
const userModel = require("../Models/userModels");
const bcrypt = require("bcrypt");
const generateToken = require("../utils");
const router = express.Router();

router.get("/getInfo/:userId", async (req, res) => {
  const { userId } = req.params;
  console.log("userId", userId);
  const user = await userModel.findById(userId);
  if (user) {
    res.send(user);
  } else {
    res.send({ message: "User not found" });
  }
});

router.post("/registeration", async (req, res) => {
  const { name, email, password } = req.body;
  const checkUser = await userModel.findOne({ email });
  console.log("Check user");
  if (checkUser) {
    res.send({ message: "User with the same Email already exist" });
    return;
  } else {
    console.log("Body", name, email, password);
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = new userModel({ name, email, password: hashPassword });
    user.save((err, user) => {
      console.log("user", user);
      if (err) {
        res.send({ message: err.message });
      }
      const token = generateToken(user);
      console.log("Token", token);
      res.status(200).send({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage,
          phoneNumber: user.phoneNumber,
          isAdmin: user.isAdmin,
          isSeller: user.isSeller,
          isWorker: user.isWorker,
          token,
        },
      });
    });
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("Body:", email, password);
  userModel.findOne({ email: email }, (err, user) => {
    if (err) {
      throw err;
    }
    if (user) {
      if (bcrypt.compare(password, user.password)) {
        const token = generateToken(user);
        console.log("Token", token);
        res.send({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin,
            isSeller: user.isSeller,
            isWorker: user.isWorker,
            token,
          },
        });
      }
    } else {
      res.send({ message: "Invalid email or password" });
    }
  });
});

router.post("/updateProfile", async (req, res) => {
  // const checkUser = await userModel.findByIdAndUpdate(req.body._id, req.body);

  const checkEmail = await userModel.findOne({
    _id: { $ne: req.body._id },
    email: req.body.email,
  });

  console.log("Req.body", req.body, checkEmail);

  if (checkEmail) {
    console.log("Email already exist");
    res.send({ message: "Email already exist" });
  } else {
    if (!req.body.password) {
      const user = await userModel.findByIdAndUpdate(req.body._id, req.body, {
        new: true,
      });
      if (user) {
        res.send(user);
      } else {
        console.log("User does not exist 1");
        res.send({ message: "User does not found" });
      }
    } else {
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        req.body.hashPassword
      );

      console.log(
        "*************",
        req.body.password,
        req.body.hashPassword,
        passwordMatch
      );
      if (passwordMatch) {
        const hashPassword = bcrypt.hashSync(req.body.newPassword, 10);
        const user = await userModel.findByIdAndUpdate(
          req.body._id,
          { ...req.body, password: hashPassword },
          {
            new: true,
          }
        );
        if (user) {
          console.log("User", user);
          res.send(user);
        } else {
          console.log("User does not exist 2");

          res.send({ message: "User does not found" });
        }
      } else {
        res.send({ message: "Password is incorrect" });
      }
    }
  }
});

router.delete("/deleteAccount/:userId", async (req, res) => {
  const userId = req.params.userId;
  userModel.findByIdAndDelete(userId).then((data, err) => {
    console.log(err, data);
    if (err) {
      res.status(500).json({ message: err });
    } else {
      res.status(200).json({ message: "User deleted Successfully" });
    }
  });
});

module.exports = router;
