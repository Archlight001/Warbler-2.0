const db = require("../models");

exports.getFollowing = async function (req, res, next) {
  try {
    let userId = req.body.id;
    let users = await db.User.findById(userId).select("following -_id");
    let followingData = [];

    for(let i=0;i<query.following.length;i++){
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
    let followers = await db.User.find({following:username});
    return res.json(followers);
  } catch (error) {
    return next(error);
  }
};

exports.followOp = async function(req,res,next){
  try {
    let currentUserId = req.body.currentUserId;
    let followUsername = req.body.followUsername;
    let followUser = await db.User.findById(currentUserId);

    if(req.params.op === "follow"){
      followUser.following.push(followUsername);
    }else{
      followUser.following.remove(followUsername);
    }  
    await followUser.save();

    return res.json(followUser);
  } catch (error) {
    return next(error);
  }
}
