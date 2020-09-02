const mongoose = require("mongoose");
const User = require("./user");

const postSchema = mongoose.Schema(
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

postSchema.pre("remove",async function(next){
  try {
    let user = await User.findById(this.user);
    user.posts.remove(this.id);
    await user.save();
  } catch (error) {
    return next(error)
  }  
})

let Post = mongoose.model("Post", postSchema);
module.exports = Post;
