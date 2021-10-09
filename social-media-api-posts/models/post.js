var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: false },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

var Post = mongoose.model("posts", postSchema);

module.exports = Post;
