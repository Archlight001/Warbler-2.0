const express = require("express");
const router = express.Router();
const {getFollowing,getFollowers,followOp,modifyProfile} = require("../handlers/user");

router.post("/following",getFollowing);
router.post("/followers",getFollowers);
router.post("/followOp/:op",followOp);
router.post("/modifyProfile/:profile",modifyProfile);

module.exports = router;