const jwt = require("jsonwebtoken");
const { log } = require("console");
const userModel = require("../Models/users");

const authMiddleware = async (req, res, next) => {
  try {
    const tokenFromHeaders = req.cookies.token;
    const data = jwt.verify(tokenFromHeaders, process.env.JWT_SECRET_KEY);
    const payload = jwt.decode(tokenFromHeaders);
    const user = await userModel
      .findById(payload.id)
      .populate([
        { path: "posts" },
        { path: "posts.user", select: "-password" },
        { path: "saved" },
      ]);
    // log(user);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      message: "Forbidden: " + error.message,
    });
  }
};

module.exports = authMiddleware;
