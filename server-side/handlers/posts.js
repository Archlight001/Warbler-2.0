const db = require("../models");
const { validate } = require("../helpers/media_validation");
const {createMediaUrl} = require("../helpers/createMediaUrl");


exports.createPost = async function (req, res, next) {
  try {  
    let hostname = req.headers.host;
    let media = req.files.media;
    let mediaFiles = [];
    let mediaName = "";
  
    if (media !== undefined) {
      const validateFile = validate(req.files.media);
      if (!validateFile.status) {
        return next(validateFile);
      }

      if (media[0] !== undefined) {
      } else {
        let mediaExtension = media.name.slice(media.name.lastIndexOf("."));        
        let newMedia = createMediaUrl(mediaExtension,hostname);
        mediaName = newMedia[1];
        mediaFiles.push(newMedia[0]);
      }
    }

    let post = await db.Post.create({
      text: req.body.text,
      user: req.params.id,
      postMediaUrl: mediaFiles,
    });

    let foundUser = await db.User.findById(req.params.id);
    foundUser.posts.push(post.id);
    await foundUser.save();

    media.mv(`${process.env.ROOT}/public/posts/${mediaName}`, async function (
      err
    ) {
      if (err) {
        return next(err);
      }
    });

    let foundPost = await db.Post.findById(post.id).populate("user");
    return res.status(200).json(foundPost);  
    
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
