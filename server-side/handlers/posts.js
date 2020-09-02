const db = require("../models");
const { validate } = require("../helpers/media_validation");

exports.createPost = async function (req, res, next) {
  try {
    // let post = await db.Post.create({
    //   text: req.body.text,
    //   user: req.params.id,
    // });
    //const mediaResult = imageFilter(req,req.files.media.mimetype);
    let media = req.files.media;
    let mediaFiles = [];
    let mediaName = "";

    if (media !== undefined) {
      const validateFile = validate(req.files.media);
      if (!validateFile.status) {
        return next(validateFile);
      }

      if(media[0] !== undefined){

      }else{
        mediaName = `${req.body.text.trim().replace(/  /g,"-")}${media.name.slice(
          media.name.lastIndexOf(".")
        )}`;
      }
    }

    console.log(mediaName);

    // let foundUser = await db.User.findById(req.params.id);
    // foundUser.posts.push(post.id);
    // await foundUser.save();

    // let foundPost = await db.Post.findById(post.id).populate("user");

    // return res.status(200).json(foundPost);
  } catch (error) {
    return next(error);
  }
};

exports.getPost = async function (req, res, next) {
  try {
    let foundPost = await db.Post.findById(req.params.post_id).populate("user");
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
