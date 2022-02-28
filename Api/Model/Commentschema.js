const mongoose =  require('mongoose');
const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    postId:{
      type: String,
      require: true,
    },
    text:{
        type:String,
        require: true,
    }
    ,
    likes: {
      type: Array,
      default: [],
    },
      
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
module.exports=Comment;