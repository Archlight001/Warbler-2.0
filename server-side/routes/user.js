const express = require("express");
const router = express.Router();
const {getFollowing,getFollowers,followOp} = require("../handlers/user");

router.post("/following",getFollowing);
router.post("/followers",getFollowers);
router.post("/followOp/:op",followOp);

module.exports = router;