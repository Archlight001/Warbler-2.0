const express = require("express");
const router = express.Router({ mergeParams: true });

const {
  createPost,
  getcurrentUserPost,
  deletePost,
  like__unlike__posts,
  repost_op,getList
} = require("../handlers/posts");


router.route("/like_unlike/:op").post(like__unlike__posts);
router.route("/repost_op/:op").post(repost_op);
router.route("/list").post(getList);
router.route("/").post(createPost).get(getcurrentUserPost);
router.route("/:post_id").delete(deletePost);

module.exports = router;