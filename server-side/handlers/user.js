const db = require("../models");

exports.getFollowing = async function (req, res, next) {
  try {
    let userId = req.body.id;
    let users = await db.User.findById(userId).select("following -_id");
    let followingData = [];

    for (let i = 0; i < users.following.length; i++) {
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

    let currentUserFollowing = followUser.following;

    if (req.params.op === "follow") {
      followUser.following.push(followUsername);
    } else if (req.params.op === "unfollow") {
      followUser.following.remove(followUsername);
    }
    await followUser.save();

    followUser = await db.User.find({ username: followUsername });
    let {
      _id,
      description,
      displayName,
      email,
      firstName,
      following,
      lastName,
      profileImageUrl,
      username,
    } = followUser[0];
    return res.json({
      _id,
      description,
      displayName,
      email,
      firstName,
      following,
      lastName,
      profileImageUrl,
      username,
      currentUserFollowing,
    });
  } catch (error) {
    return next(error);
  }
};

exports.checkFollowing = async function (req, res, next) {
  try {
    let currentUserId = req.body.id;
    let username = req.body.username;
    let User = await db.User.findById(currentUserId);
    const checkIfFollowing = User.following.find((value) => value === username);
    if (checkIfFollowing) {
      return res.json({ following: true });
    } else {
      return res.json({ following: false });
    }
  } catch (error) {
    return next(error);
  }
};

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

    let {
      id,
      username,
      displayName,
      description,
      profileImageUrl,
      following,
    } = user;

    return res.json({
      id,
      username,
      displayName,
      description,
      profileImageUrl,
      following,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getUserInfo = async function (req, res, next) {
  try {
    let userId = req.body.id;
    let currentUserId = req.body.currentUserId;
    let currentUser = await db.User.findById(currentUserId);
    let currentUserFollowing = currentUser.following;
    let user = await db.User.findById(userId);
    let {
      id,
      username,
      displayName,
      description,
      profileImageUrl,
      following,
    } = user;

    return res.json({
      id,
      username,
      displayName,
      description,
      profileImageUrl,
      following,
      currentUserFollowing,
    });
  } catch (error) {
    return next(error);
  }
};

exports.searchUser = async function (req, res, next) {
  try {
    let params = req.body.params;
    let results = [];
    if (params.trim() !== "") {
      let searchUser = [];
      searchUser = await db.User.find(
        {
          username: { $regex: params, $options: "i" },
        },
        "id username displayName profileImageUrl"
      );

      if (searchUser[0] !== undefined) {
        if (searchUser.length === 1) {
          results.push(searchUser[0]);
        } else {
          searchUser.forEach((user) => {
            results.push(user);
          });
        }
      }

      searchUser = await db.User.find(
        {
          displayName: { $regex: params, $options: "i" },
        },
        "id username displayName profileImageUrl"
      );

      if (searchUser[0] !== undefined) {
        if (searchUser.length === 1) {
          let duplicate = results.find(
            (result) => result.username === searchUser[0].username
          );
          if (duplicate === undefined) {
            results.push(searchUser[0]);
          }
        } else {
          searchUser.forEach((user) => {
            let duplicate = results.find(
              (result) => result.username === user.username
            );
            if (duplicate === undefined) {
              results.push(user);
            }
          });
        }
      }
    }

    return res.json(results);
  } catch (error) {
    return next(error);
  }
};
