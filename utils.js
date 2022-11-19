const jwt = require("jsonwebtoken");

const generateToken = user => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isSeller: user.isSeller,
      isWorker: user.isWorker,
    },
    "secret",
    { expiresIn: "30d" }
  );
};


module.exports = generateToken;