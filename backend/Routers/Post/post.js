const express = require("express");
const authMiddleware = require("../../middlewares/auth");
const {
  createPost,
  likeDislikePost,
  commentOnPost,
  getAllPosts,
  deletePost,
} = require("../../Controllers/Post/post");

const router = express.Router();

router.post("/", authMiddleware, createPost);

router.get("/", getAllPosts);

router.post("/comment/:postId", authMiddleware, commentOnPost);

router.post("/likes/:postId", authMiddleware, likeDislikePost);

router.post("/delete/:postId", authMiddleware, deletePost);

module.exports = router;
