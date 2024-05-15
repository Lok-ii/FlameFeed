const userModel = require("../Models/users");
const { log } = require("console");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const postModel = require("../Models/post");

const uploadPath = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const fileName = uuidv4() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
}).single("photoURL");

const userRegistration = async (req, res) => {
  try {
    const user = await userModel.findOne({
      email: req.body.email.toLowerCase(),
    });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const newUser = await new userModel(req.body); 
    const newUserInstance = await newUser.save();
    res.json({
      success: true,
      message: "User registered successfully, login to continue",
    });
  } catch (error) {
    log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.json({
      success: false,
      message: "User not found",
    });
  } else {
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    log("isMatch :", isMatch);
    if (isMatch) {
      const expiryDateTime = Math.floor(new Date().getTime() / 1000) + 172800; // 24 hour validity for token
      const payload = {
        id: user._id,
        name: user.username,
        exp: expiryDateTime,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);
      const userWithoutPassword = await userModel
        .findOne({ email: req.body.email })
        .select(["-password"])
        .populate([
          { path: "posts" },
          { path: "posts.user", select: "-password" },
          { path: "saved" },
        ]);
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true, // Use secure cookies in production
          sameSite: "None", // Necessary if your frontend and backend are on different origins and you're using secure cookies
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        })
        .json({
          success: true,
          message: "Welcome back " + user.username + "!",
          token: token,
          user: userWithoutPassword,
        });
    } else {
      res.json({
        success: false,
        message: "Invalid password",
      });
    }
  }
};

const userLogout = async (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: true, // Use secure cookies in production
      sameSite: "None", // Necessary if your frontend and backend are on different origins and you're using secure cookies
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    })
    .json({
      success: true,
      message: "Logged out successfully!",
    });
};

const addAndRemoveFavourites = async (req, res) => {
  let message = "";
  let updateObject = {};
  try {
    const user = req.user;
    if (user.saved.indexOf(req.params.postId)) {
      updateObject = {
        $pull: {
          saved: req.params.postId,
        },
      };
      message = "Removed from Favourites";
    } else {
      updateObject = {
        $push: {
          saved: req.params.postId,
        },
      };
      message = "Added to Favourites";
    }
    const updateduser = await userModel
      .findByIdAndUpdate(req.user._id, updateObject, { new: true })
      .populate([
        { path: "posts" },
        { path: "posts.user", select: "-password" },
      ])
      .select(["-password", "-__v"]);
    const allPosts = await postModel.find().populate([
      {
        path: "user",
        select: "-password",
      },
      {
        path: "comments.user",
        select: "-password",
      },
    ]);
    res.json({
      success: true,
      message: message,
      updatedUser: updateduser,
      allPosts,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  let user = req.user.toObject();
  delete user.password;
  res.json({
    success: true,
    message: "User has been successfully retrieved.",
    user: user,
  });
};

const updateUser = async (req, res) => {
  console.log(req.body);
  upload(req, res, async (error) => {
    if (error) {
      log("ERROR", error);
      return res.status(500).json({
        success: false,
        message: "Error uploading the file.",
      });
    } else {
      let updatedData = {};
      if (req.body.profile) {
        updatedData = {
          ...req.body,
          photoURL: req.body.profile,
        };
      } else {
        log(req.file);
        updatedData = {
          ...req.body,
          // photoURL: req.file.path,
          photoURL: "https://flamefeed.onrender.com/uploads/" + req.file.filename,
        };
      }
      try {
        const user = await userModel
          .findByIdAndUpdate(req.user._id, updatedData, {
            new: true,
          })
          .populate([
            { path: "posts" },
            { path: "posts.user", select: "-password" },
            { path: "saved" },
          ])
          .select(["-password"]);
        const allPosts = await postModel.find().populate([
          {
            path: "user",
            select: "-password",
          },
          {
            path: "comments.user",
            select: "-password",
          },
        ]);
        res.json({
          success: true,
          message: "User has been successfully updated.",
          user: user,
          allPosts,
        });
      } catch (error) {
        log(error);
        res.status(res.statusCode).json({
          success: false,
          message: error.message,
        });
      }
    }
  });
};

const checkUserExist = async (req, res) => {
  const type = req.params.type;
  let user;
  try {
    if (type === "email") {
      user = await userModel.findOne({ email: req.body.type });
    } else if (type === "username") {
      user = await userModel.findOne({ username: req.body.type });
    }
    if (user) {
      return res.json({
        success: true,
        message: `${type} already exists`,
      });
    }
    res.json({
      success: false,
      message: `${type} does not exist`,
    });
  } catch (error) {
    log(error);
    res.status(res.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel
      .find()
      .populate([
        { path: "posts" },
        { path: "posts.user", select: "-password" },
        { path: "saved" },
      ])
      .select(["-password"]);
    res.json({
      success: true,
      message: "Users have been successfully retrieved.",
      users: users,
    });
  } catch (error) {
    log(error);
    res.status(res.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

const getProfileData = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ username: req.params.username })
      .select(["-password"])
      .populate([
        {
          path: "posts",
        },
        {
          path: "posts.user",
          select: "-password",
        },
        {
          path: "saved",
        },
      ]);
    console.log(user);
    res.json({
      success: true,
      message: "User has been successfully retrieved.",
      user: user,
    });
  } catch (error) {
    log(error);
    res.status(res.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

const followUnfollow = async (req, res) => {
  try {
    let followedUpdate;
    let followerUpdate;
    const followedUser = await userModel.findById(req.params.id);
    const followerUser = await userModel.findById(req.user._id);
    if (followedUser.followers.includes(req.user._id)) {
      followedUpdate = {
        $pull: {
          followers: req.user._id,
        },
      };
      followerUpdate = {
        $pull: {
          following: req.params.id,
        },
      };
    } else {
      followedUpdate = {
        $push: {
          followers: req.user._id,
        },
      };
      followerUpdate = {
        $push: {
          following: req.params.id,
        },
      };
    }
    const updatedFollowedUser = await userModel
      .findByIdAndUpdate(req.params.id, followedUpdate, { new: true })
      .populate([
        { path: "posts" },
        { path: "posts.user", select: "-password" },
        { path: "saved" },
      ])
      .select(["-password"]);
    const updatedFollowerUser = await userModel
      .findByIdAndUpdate(req.user._id, followerUpdate, { new: true })
      .populate([
        { path: "posts" },
        { path: "posts.user", select: "-password" },
        { path: "saved" },
      ])
      .select(["-password"]);
    log("Followed", updatedFollowedUser);
    log("Follower", updatedFollowerUser);
    res.json({
      success: true,
      message: "User has been successfully updated.",
      followedUser: updatedFollowedUser,
      followerUser: updatedFollowerUser,
    });
  } catch (error) {
    log(error);
    res.status(res.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

const getSearchResults = async (req, res) => {
  try {
    const results = await userModel.find({
      $or: [
        { username: { $regex: req.params.search, $options: "i" } },
        { email: { $regex: req.params.search, $options: "i" } },
      ],
    });
    res.json({
      success: true,
      message: "Search results",
      results,
    });
  } catch (error) {
    log(error);
    res.status(res.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  userLogin,
  userRegistration,
  userLogout,
  addAndRemoveFavourites,
  getUser,
  updateUser,
  checkUserExist,
  getAllUsers,
  getProfileData,
  followUnfollow,
  getSearchResults,
};
