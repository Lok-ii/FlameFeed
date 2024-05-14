const express = require("express");
const {
  userLogin,
  userRegistration,
  userLogout,
  likePost,
  getUser,
  updateUser,
  checkUserExist,
  getAllUsers,
  getProfileData,
  followUnfollow,
  getSearchResults,
  addAndRemoveFavourites,
} = require("../controllers/users.js");
const authMiddleware = require("../middlewares/auth.js");

const router = express.Router();

router.get("/", getAllUsers);

router.post("/signup", userRegistration);

router.post("/login", userLogin);

router.post("/signout", userLogout);

router.post("/authenticate", authMiddleware, getUser);

router.patch("/update", authMiddleware, updateUser);

router.patch("/updatefollower/:id", authMiddleware, followUnfollow);

router.post("/search/:search", authMiddleware, getSearchResults);

router.post("/check/:type", checkUserExist);

router.post("/saved/:postId", authMiddleware, addAndRemoveFavourites);

router.get("/:username", getProfileData);

module.exports = router;
