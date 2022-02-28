const express = require('express');
const router =express.Router();
const User = require('../model/Userschema.js');
const Post =  require('../model/Postschema.js');



//create a blog

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update a blog
// here params id is of one post id created by itself mongo db

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

 
//like / dislike a post
//similar to follow and unfollow user(refer in user.js file)
//here id in params is post id

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The blogpost has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The blogpost has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});


 
  
//get a post
//here id is post id

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

 
//get user's all posts

router.get("/profile/:userId", async (req, res) => {
  try {
    const blogs = await Post.find({ userId: req.params.userId });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all notes
router.get("/", async (req, res) => {
  try {
    const data =await Post.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(404).json(err);
  }
});

 
module.exports =router;