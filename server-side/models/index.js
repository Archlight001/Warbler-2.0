const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(process.env.DB_URI || "mongodb://localhost/warbler2", {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports.User = require("./user");
module.exports.Post = require("./post");
