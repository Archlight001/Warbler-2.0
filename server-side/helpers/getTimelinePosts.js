const db = require("../models/index");

async function getTimelinePosts(currentUserId) {
  try {
      console.log(currentUserId);
    let currentUser = await db.User.findById(currentUserId);
    let currentUserFollowing = currentUser.following;
    let allPosts = await db.Post.find()
      .sort({ createdAt: "desc" })
      .populate("user", { username: true, profileImageUrl: true });
    let timelinePosts = [];
    currentUserFollowing.forEach((user) => {
      for (let i = 0; i < allPosts.length; i++) {
        if (allPosts[i].user.username === user) {
          timelinePosts.push(allPosts[i]);
        } else if (allPosts[i].user.id === currentUserId) {
          timelinePosts.push(allPosts[i]);
        }
      }
    });
    return timelinePosts;
  } catch (error) {
    return error;
  }
}

exports.getTimelinePosts = getTimelinePosts;
