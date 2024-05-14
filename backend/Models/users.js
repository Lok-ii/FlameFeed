const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.models = {};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    default: "Prefer not to say",
  },
  likedPosts: {
    type: [mongoose.Schema.ObjectId],
    default: [],
    ref: "posts",
  },
  posts: {
    type: [mongoose.Schema.ObjectId],
    default: [],
    ref: "posts",
  },
  saved: {
    type: [mongoose.Schema.ObjectId],
    default: [],
    ref: "posts",
  },
  followers: {
    type: [mongoose.Schema.ObjectId],
    default: [],
    ref: "users",
  },
  following: {
    type: [mongoose.Schema.ObjectId],
    default: [],
    ref: "users",
  },
  photoURL: {
    type: String,
    default: "",
  },
});

userSchema.pre("save", function () {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
