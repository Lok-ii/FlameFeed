const { log } = require("console");
const postModel = require("../../Models/post");
const userModel = require("../../Models/users");
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { updateUser } = require("../users");

const uploadPath = path.join(__dirname, "..", "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const fileName = uuidv4() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
}).single("file");

const createPost = async (req, res) => {
  upload(req, res, async (error) => {
    if (error) {
      log("ERROR", error);
      return res.status(500).json({
        success: false,
        message: "Error uploading the file.",
      });
    } else {
      try {
        const post = await postModel.create({
          ...req.body,
          media: req.file.destination + "/" + req.file.filename,
          // media: "http://localhost:8080/" + req.file.filename,
          user: req.user._id,
        });
        const newPost = await postModel.findById(post._id).populate([
          {
            path: "user",
            select: "-password",
          },
          {
            path: "comments.user",
            select: "-password",
          },
        ]);
        const updatedUser = await userModel
          .findByIdAndUpdate(
            req.user._id,
            {
              $push: {
                posts: newPost._id,
              },
            },
            { new: true }
          )
          .populate([
            { path: "posts" },
            { path: "posts.user", select: "-password" },
            { path: "saved" },
          ]);
        const user = updatedUser.toObject();
        delete user.password;
        res.json({
          success: true,
          message: "Post has been successfully created.",
          post: newPost,
          user: user,
        });
      } catch (error) {
        console.log(error);
        res.json({
          success: false,
          message: "Forbidden: " + error.message,
        });
      }
    }
  });
};

const likeDislikePost = async (req, res) => {
  try {
    const user = req.user;
    const post = await postModel.findById(req.params.postId);
    let updateObject = {};
    let userUpdate = {};
    let message = "";
    if (post.likes.includes(user._id)) {
      updateObject = {
        $pull: {
          likes: user._id,
        },
      };
      userUpdate = {
        $pull: {
          likedPost: req.params.postId,
        },
      };
      message = "Like Removed";
    } else {
      updateObject = {
        $push: {
          likes: user._id,
        },
      };
      userUpdate = {
        $push: {
          likedPost: req.params.postId,
        },
      };
      message = "Liked";
    }
    const updatedPost = await postModel
      .findByIdAndUpdate(req.params.postId, updateObject, { new: true })
      .populate([
        {
          path: "user",
          select: "-password",
        },
        {
          path: "comments.user",
          select: "-password",
        },
      ]);

    const updatedUser = await userModel
      .findByIdAndUpdate(req.user._id, userUpdate, { new: true })
      .populate([
        { path: "posts" },
        { path: "posts.user", select: "-password" },
        { path: "saved" },
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
      post: updatedPost,
      user: updatedUser,
      allPosts,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      message: "Forbidden: " + error.message,
    });
  }
};

const commentOnPost = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const post = await postModel
      .findByIdAndUpdate(
        req.params.postId,
        {
          $push: {
            comments: {
              $each: [
                {
                  ...req.body,
                  user: req.user._id,
                },
              ],
              $position: 0,
            },
          },
        },
        { new: true }
      )
      .populate([
        {
          path: "user",
          select: "-password",
        },
        {
          path: "comments.user",
          select: "-password",
        },
      ]);
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
      message: "Comment added.",
      post: post,
      allPosts,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      message: "Forbidden: " + error.message,
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.find().populate([
      {
        path: "user",
        select: "-password",
      },
      {
        path: "comments.user",
        select: "-password",
      },
    ]);
    log(posts);
    res.json({
      success: true,
      message: "Posts have been successfully retrieved.",
      posts: posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await postModel.findByIdAndDelete(req.params.postId);
    const user = await userModel
      .findByIdAndUpdate(
        req.user._id,
        {
          $pull: {
            posts: req.params.postId,
          },
        },
        { new: true }
      )
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
      message: "Post has been successfully deleted.",
      posts: allPosts,
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(403).json({
      success: false,
      message: "Forbidden: " + error.message,
    });
  }
};

module.exports = {
  createPost,
  likeDislikePost,
  commentOnPost,
  getAllPosts,
  deletePost,
};
