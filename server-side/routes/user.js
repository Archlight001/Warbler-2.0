const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getFollowing,
  getFollowers,
  followOp,
  modifyProfile,
  getUserInfo,
  checkFollowing,
  searchUser,
  fetchRecommendedList,getProfileImage
} = require("../handlers/user");

router.post("/following", getFollowing);
router.post("/followers", getFollowers);
router.post("/followOp/checkFollowing", checkFollowing);
router.post("/followOp/:op", followOp);
router.get("/getProfileImage",getProfileImage)
router.get("/recommend",fetchRecommendedList);
router.post("/modifyProfile/:profile", modifyProfile);
router.post("/search", searchUser);
router.post("/", getUserInfo);

module.exports = router;
