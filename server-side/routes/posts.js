const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createPost,
  getcurrentUserPost,
  deletePost,
} = require("../handlers/posts");

router.route("/").post(createPost).get(getcurrentUserPost);
router.route("/:post_id").delete(deletePost);

module.exports = router;