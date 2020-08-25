require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./handlers/error");
const db = require("./models");
const userauthRoutes = require("./routes/userauth")

const app = express();
const PORT = 8082;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/userauth",userauthRoutes);




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
