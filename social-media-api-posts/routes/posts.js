var express = require("express");
var router = express.Router();
var ensureAuthenticated = require("../auth/auth").ensureAuthenticated;
var Post = require("../models/post");


router.get("/", ensureAuthenticated, (req, res) => {
  Post.find({})
    .then((posts) => {
      return res.status(200).json(posts);
    })
    .catch((err) => {
      return res.status(500).json({ message: "server error" });
    });
});

router.post("/", ensureAuthenticated, (req, res) => {
  var newPost = new Post({
    title: req.body.title,
    username: req.user.username,
    content: req.body.content,
  });

  newPost
    .save()
    .then((newPost) => {
      return res.status(200).json(newPost);
    })
    .catch((err) => {
      return res.status(500).json({ message: "server error" });
    });
});

router.delete("/:id", ensureAuthenticated, (req, res) => {
  const id = req.params.id;
  Post.findOneAndDelete({ _id: id, username: req.user.username })
    .then((deletedPost) => {
      if (!deletedPost)
        return res.status(500).json({ message: "server error" });
      return res.status(200).json(deletedPost);
    })
    .catch((err) => {
      return res.status(500).json({ message: "server error" });
    });
});

router.patch("/:id", ensureAuthenticated, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  Post.findOneAndUpdate({_id: id, username: req.user.username}, body, { new: true })
    .then((updatedPost) => {
      if(!updatedPost) return res.status(500).json({ message: "server error" });
      return res.status(200).json(updatedPost);
    })
    .catch((err) => {
      return res.status(500).json({ message: "server error" });
    });
});

module.exports = router;
