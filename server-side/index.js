require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./handlers/error");
const userauthRoutes = require("./routes/userauth");
const postRoutes = require("./routes/posts");
const bodyParser = require('body-parser')
const upload = require("express-fileupload");
const db = require("./models");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

const app = express();
const PORT = 8082;

process.env["ROOT"] = __dirname;

app.use(cors());
app.use(bodyParser.json())
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(upload());


app.use("/api/userauth", userauthRoutes);
app.use(
  "/api/users/:id/posts",
  postRoutes
);

app.get("/api/posts", async function (req, res, next) {
  try {
    let allPosts = await db.Post.find()
      .sort({ createdAt: "desc" })
      .populate("user", { username: true, profileImageUrl: true });
    return res.json(allPosts);
  } catch (error) {
    return next(err);
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
