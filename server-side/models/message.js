const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxlength: 160,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

let Message = mongoose.model("Message", messageSchema);
module.exports = Message;
