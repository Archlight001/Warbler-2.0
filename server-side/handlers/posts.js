const db = require("../models");

exports.createPost = async function (req, res, next) {
  try {
    let post = await db.Post.create({
      text: req.body.text,
      user: req.params.id,
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.posts.push(post.id);
    await foundUser.save();

    let foundPost = await db.Post.findById(post.id).populate("user");

    return res.status(200).json(foundPost);
  } catch (error) {
    return next(error);
  }
};

exports.getPost = async function (req, res, next) {
  try {
    let foundPost = await db.Post.findById(
      req.params.post_id
    ).populate("user");
    return res.status(200).json(foundPost);
  } catch (error) {
    return next(error);
  }
};

exports.deletePost = async function (req, res, next) {
  try {
    let foundPost = await db.Post.findById(req.params.post_id);
    await foundPost.remove();
    return res.json(foundPost);
  } catch (error) {
    return next(error);
  }
};
