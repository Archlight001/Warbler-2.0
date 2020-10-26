const db = require("../models");
const mongodb = require("mongodb");
const { validate } = require("../helpers/media_validation");
const { createMediaUrl } = require("../helpers/createMediaUrl");
const fs = require("fs");
const { getTimelinePosts } = require("../helpers/getTimelinePosts");
const binary = mongodb.Binary;

exports.createPost = async function (req, res, next) {
  try {
    let hostname = req.headers.host;

    let mediaFiles = [];
    let mediaName = "";
    let mediaNames = [];

    if (req.files) {
      let media = req.files.media;
      const validateFile = validate(req.files.media);
      if (!validateFile.status) {
        return next(validateFile);
      }

     
      if (media[0] !== undefined) {
        for (let i = 0; i < media.length; i++) {
          // let mediaExtension = media[i].name.slice(
          //   media[i].name.lastIndexOf(".")
          // );
          // let newMedia = createMediaUrl(mediaExtension, hostname);
          // mediaFiles.push(newMedia[0]);
          // mediaNames.push(newMedia[1]);
          mediaFiles = [...mediaFiles,{data:binary(media[i].data),contentType:media[i].mimetype}]
        }
      } else {
        mediaFiles = [...mediaFiles,{data:binary(media.data),contentType:media.mimetype}]
        // let mediaExtension = media.name.slice(media.name.lastIndexOf("."));
        // let newMedia = createMediaUrl(mediaExtension, hostname);
        // mediaName = newMedia[1];
        // mediaFiles.push(newMedia[0]);
      }
    }

    let post = await db.Post.create({
      text: req.body.text,
      user: req.params.id,
      postMedia: mediaFiles,
    });

    let foundUser = await db.User.findById(req.params.id);
    foundUser.posts.push(post.id);
    await foundUser.save();

    // if (req.files) {
    //   let media = req.files.media;
    //   if (mediaNames.length !== 0) {
    //     for (let i = 0; i < mediaNames.length; i++) {
    //       media[i].mv(
    //         `${process.env.ROOT}/public/posts/${mediaNames[i]}`,
    //         async function (err) {
    //           if (err) {
    //             return next(err);
    //           }
    //         }
    //       );
    //     }
    //   } else {
    //     media.mv(
    //       `${process.env.ROOT}/public/posts/${mediaName}`,
    //       async function (err) {
    //         if (err) {
    //           return next(err);
    //         }
    //       }
    //     );
    //   }
    // }

    let foundPost = await db.Post.findById(post.id).populate("user");
    return res.status(200).json(foundPost);
  } catch (error) {
    return next(error);
  }
};

exports.getcurrentUserPost = async function (req, res, next) {
  try {
    let foundPost = await db.Post.find({ user: req.body.id }).populate(
      "user"
    );
    return res.status(200).json([foundPost, []]);
  } catch (error) {
    return next(error);
  }
};

exports.deletePost = async function (req, res, next) {
  try {
    let foundPost = await db.Post.findById(req.params.post_id);
    await foundPost.remove((err, post) => {
      if (err) {
        return next(err);
      }
      if (post.postMediaUrl.length > 1 && post.postMediaUrl.length !== 0) {
        for (let i = 0; i < post.postMediaUrl.length; i++) {
          fs.unlink(
            `${process.env.ROOT}/public${post.postMediaUrl[i].slice(
              post.postMediaUrl[i].indexOf("/")
            )}`,
            function () {
              console.log("File deleted");
            }
          );
        }
      } else {
        if (post.postMediaUrl.length !== 0) {
          fs.unlink(
            `${process.env.ROOT}/public${post.postMediaUrl[0].slice(
              post.postMediaUrl[0].indexOf("/")
            )}`,
            function () {
              console.log("File deleted");
            }
          );
        }
      }
      return res.json(post);
    });
  } catch (error) {
    return next(error);
  }
};

exports.like__unlike__posts = async (req, res, next) => {
  try {
    let postId = req.body.postId;
    let users__username = req.body.user;

    let getPost = await db.Post.findById(postId);
    if (req.params.op === "like") {
      getPost.likedBy.push(users__username);
    } else if (req.params.op === "unlike") {
      getPost.likedBy.remove(users__username);
    }

    await getPost.save();

    getTimelinePosts(req.params.id)
      .then((posts) => {
        return res.json(posts);
      })
      .catch((err) => {
        return next(err);
      });
  } catch (error) {
    return next(error);
  }
};

exports.repost_op = async (req, res, next) => {
  try {
    let postId = req.body.postId;
    let users__username = req.body.user;

    let getPost = await db.Post.findById(postId);
    if (req.params.op === "repost") {
      getPost.repostedBy.push(users__username);
    } else if (req.params.op === "remove__poster") {
      getPost.repostedBy.remove(users__username);
    }

    await getPost.save();

    getTimelinePosts(req.params.id)
      .then((posts) => {
        return res.json(posts);
      })
      .catch((err) => {
        return next(err);
      });
  } catch (error) {
    return next(error);
  }
};

exports.getList = async (req, res, next) => {
  try {
    let list = [];
    for (let i = 0; i < req.body.list.length; i++) {
        let findUser = await db.User.find({ username: req.body.list[i] });
        let {id, username, displayName, profileImageUrl } = findUser[0];
        list.push({id, username, displayName, profileImageUrl });
    }
    return res.json(list);
  } catch (error) {
    return next(error);
  }
};
