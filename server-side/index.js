require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./handlers/error");
const { getTimelinePosts } = require("./helpers/getTimelinePosts");
const userauthRoutes = require("./routes/userauth");
const userOpsRoutes = require("./routes/user");
const postRoutes = require("./routes/posts");
const bodyParser = require("body-parser");
const upload = require("express-fileupload");
const db = require("./models");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 8082;

process.env["ROOT"] = __dirname;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(upload());

app.use("/api/userauth", userauthRoutes);
app.use("/api/userops/:id",loginRequired, userOpsRoutes);
app.use("/api/users/:id/posts",postRoutes);
// loginRequired,ensureCorrectUser,

app.post("/api/posts", loginRequired,async function (req, res, next) {
  try {
    // let currentUserId = req.body.id;
    // let currentUser = await db.User.findById(currentUserId);
    // let currentUserFollowing = currentUser.following;
    // let allPosts = await db.Post.find()
    //   .sort({ createdAt: "desc" })
    //   .populate("user", { username: true, profileImageUrl: true });
    // let timelinePosts = [];
    // currentUserFollowing.forEach((user) => {
    //   for (let i = 0; i < allPosts.length; i++) {
    //     if (allPosts[i].user.username === user) {
    //       timelinePosts.push(allPosts[i]);
    //     }else if(allPosts[i].user.id === currentUserId){
    //       timelinePosts.push(allPosts[i]);
    //     }
    //   }
    // });

  

    getTimelinePosts(req.body.id)
      .then((posts) => {
        return res.json(posts);
      })
      .catch((err) => {
        return next(err);
      });
  } catch (error) {
    return next(error);
  }
});

//Error Handling
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use(errorHandler);

app.listen(PORT, function () {
  console.log(`App is running on port ${PORT}`);
});
