const express = require("express");
const router = express.Router();
const {getFollowing,getFollowers,followOp,modifyProfile,getUserInfo} = require("../handlers/user");

router.post("/",getUserInfo)
router.post("/:id/following",getFollowing);
router.post("/:id/followers",getFollowers);
router.post("/:id/followOp/:op",followOp);
router.post("/:id/modifyProfile/:profile",modifyProfile);

module.exports = router;