const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentLikes: {
    type: [mongoose.Schema.ObjectId],
    default: [],
    ref: "users",
  },
  content: {
    type: String,
    required: true,
    default: "",
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "users",
  },
});

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "users",
  },
  expandedId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: String,
    required: true,
    default: new Date().toISOString(),
  },
  comments: {
    type: [commentSchema],
    default: [],
  },
  caption: {
    type: String,
    default: "",
  },
  likes: {
    type: [mongoose.Schema.ObjectId],
    default: [],
    ref: "users",
  },
  media: {
    type: String,
    required: true,
    default: "",
  },
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
