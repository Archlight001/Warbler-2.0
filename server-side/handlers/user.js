const db = require("../models");

exports.getFollowing = async function (req, res, next) {
  try {
    let userId = req.params.id;
    let users = await db.User.findById(userId).select("following -_id");
    let followingData = [];

    for (let i = 0; i < query.following.length; i++) {
      let d = await db.User.find({ username: users.following[i] });
      followingData.push(d[0]);
    }

    return res.json(followingData);
  } catch (error) {
    return next(error);
  }
};

exports.getFollowers = async function (req, res, next) {
  try {

    let username = req.body.username;
    let followers = await db.User.find({ following: username });
    return res.json(followers);
  } catch (error) {
    return next(error);
  }
};

exports.followOp = async function (req, res, next) {
  try {
    let currentUserId = req.body.id;
    let followUsername = req.body.username;
    let followUser = await db.User.findById(currentUserId);

    if (req.params.op === "follow") {
      followUser.following.push(followUsername);
    } else if (req.params.op === "unfollow") {
      followUser.following.remove(followUsername);
    }
    await followUser.save();

    followUser = await db.User.find({username:followUsername});

    return res.json(followUser[0]);
  } catch (error) {
    return next(error);
  }
};

exports.checkFollowing = async function(req,res,next){
  try {
    let currentUserId = req.body.id;
    let username = req.body.username;
    let User = await db.User.findById(currentUserId);
    const checkIfFollowing = User.following.find(value => value === username);
    if(checkIfFollowing){
      return res.json({following:true})
    }else{
      return res.json({following:false})
    }
  } catch (error) {
    return next(error);
  }
}

exports.modifyProfile = async function (req, res, next) {
  try {
    let currentUserId = req.body.id;
    let user = await db.User.findById(currentUserId);

    let newValue = req.body.value;

    if (req.params.profile === "description") {
      user.description = newValue;
    } else if (req.params.profile === "displayName") {
      user.displayName = newValue;
    }

    await user.save();

    let {id,
      username,
      displayName,
      description,
      profileImageUrl,
      following
    } = user;

    return res.json({
      id,
      username,
      displayName,
      description,
      profileImageUrl,
      following
    });
  } catch (error) {
    return next(error);
  }
};

exports.getUserInfo = async function (req, res, next) {
  try {
    let currentUserId = req.body.id;
    let user = await db.User.findById(currentUserId);
    let {id,
      username,
      displayName,
      description,
      profileImageUrl,
      following
    } = user;

    return res.json({
      id,
      username,
      displayName,
      description,
      profileImageUrl,
      following
    });
  } catch (error) {
    return next(error);
  }
};
