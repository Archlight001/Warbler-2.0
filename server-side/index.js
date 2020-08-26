require("dotenv").config();
const express = require("express");
const cors = require("cors");
const errorHandler = require("./handlers/error");
const userauthRoutes = require("./routes/userauth");
const messageRoutes = require("./routes/messages");
const upload = require("express-fileupload");
const db = require("./models");

const app = express();
const PORT = 8082;

process.env['ROOT']=__dirname;

app.use(cors());
app.use(upload());
app.use(express.urlencoded({ extended: true}));

app.use("/api/userauth",userauthRoutes);
app.use("/api/users/:id/messages",messageRoutes);



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
