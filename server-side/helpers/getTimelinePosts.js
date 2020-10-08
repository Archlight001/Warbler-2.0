const db = require("../models/index");

async function getTimelinePosts(currentUserId) {
  try {
    let currentUser = await db.User.findById(currentUserId);
    let currentUserFollowing = currentUser.following;
    let allPosts = await db.Post.find()
      .sort({ createdAt: "desc" })
      .populate("user", { username: true, profileImageUrl: true });
    let timelinePosts = [];
    
    if(currentUserFollowing.length !== 0){
      currentUserFollowing.forEach((user) => {
        for (let i = 0; i < allPosts.length; i++) {
          if (allPosts[i].user.username === user) {
            timelinePosts.push(allPosts[i]);
          } else if (allPosts[i].user.id === currentUserId) {
            timelinePosts.push(allPosts[i]);
          }
        }
      });
    }else{
      allPosts.forEach((post)=>{
        if (post.user.id === currentUserId) {
          timelinePosts.push(post);
        }
      })
    }
    

    let repostedPosts = [];
    let whoReposted = [];
    currentUserFollowing.forEach((user) => {
      for (let i = 0; i < allPosts.length; i++) {
        let findUser = allPosts[i].repostedBy.find(reposted__user=> reposted__user===user);
        if(findUser!==undefined){
          let checkRepeatedPosts = repostedPosts.find(post => post.id === allPosts[i].id);
          if(checkRepeatedPosts === undefined){
            repostedPosts.push(allPosts[i])
            whoReposted.push({id:allPosts[i].id,repostedBy:findUser})
          }         
        }
      }
    });

    

    let filteredRepostedPosts = [];
    repostedPosts.forEach(post=>{
      let isDuplicate = timelinePosts.find(tpost => (tpost.id === post.id));
      if(isDuplicate === undefined){
        filteredRepostedPosts.push(post);     
      }
    })

    let whoRepostedFilter = [];
    for(let i=0;i<filteredRepostedPosts.length;i++){
      whoReposted.forEach(post=>{
        if(post.id === filteredRepostedPosts[i].id){
          whoRepostedFilter.push(post);
        }
      })
    }
    filteredRepostedPosts.forEach(post=>{
      timelinePosts.push(post);
    })

    return [timelinePosts,whoRepostedFilter]
  } catch (error) {
    return error;
  }
}

exports.getTimelinePosts = getTimelinePosts;
