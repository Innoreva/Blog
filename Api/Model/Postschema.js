const mongoose =  require('mongoose');
 
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    blogtopic:{
        type: String,
        max:15,
    },
    desc: {
      type: String,
      required: true,
    },
    blogimg:{
      type:String,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports=Post;
