const express = require('express');
const router =express.Router();

const User = require('../model/Userschema.js');
const Post =  require('../model/Postschema.js');
const Comment = require('../model/Commentschema.js');



//create a comment for  a note
//here id is post id 

router.post("/:id", async (req, res) => {
    const commentinfo={
        userId:req.body.userId,
        postId:req.params.id,
        text:req.body.text,
    }
    
  const newComment = new Comment(commentinfo);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//like / dislike a comment
//similar to follow and unfollow user(refer in user.js file)
//here id in params is comment id

router.put("/:id/like", async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment.likes.includes(req.body.userId)) {
        await comment.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("The comment has been liked");
      } else {
        await comment.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The comment has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//for getting all the comment for a note
//here a  id is postid
router.get('/:id', async (req,res)=>{

    try{
    const comment =await Comment.find({ postId: req.params.id });
    res.status(200).json(comment);
    }catch (err) {
        res.status(500).json(err);
      }
})
 
module.exports=router;