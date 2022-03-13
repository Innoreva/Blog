//login and registering for  a user is done here

const express =require('express')
const router = express.Router();
const  User = require('../model/Userschema.js');
const bcrypt = require('bcrypt');

//register
router.post('/register', async (req,res)=>{
  
    try{
         //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newuser = new User({
      username:req.body.username,
      email: req.body.email,
      password:hashedPassword,
      institution:req.body.institution,
      desc:req.body.desc,
      profilePicture:req.body.profilePicture,
      city:req.body.city,
      Firstname:req.body.Firstname,
      Lastname:req.body.Lastname,
  }) 
  const user=await newuser.save();
  res.status(200).json(user);

    } catch(err){
        res.status(500).json(err);
    }
})



//Login
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      !user && res.status(404).json("user not found ,enter correct email id and password");
  
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      !validPassword && res.status(400).json("wrong password")
  
       res.status(200).json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  });




//update credentials of user
//here id is id created by mongodb of each user,you will have to pass in frontend while updating the credentials of user

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});


//delete user 

router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
router.get("/:id", async (req, res) => {
  try {
     const user = await User.findById(req.params.id);
      //we do not need unnecessaary information about user like password updated at
      //user._doc is basically all object
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});


//follow a user :-

//step-1: here i am just checking that an user can not follow own,so user has to pass their own id and then we can compare to this id with the id of person who logged in.

//step-2: just i am pushing the id of user which is followed , to login user's followings

//step-3: id which is in params is followed by req.body.userid and hence this user's followers array is updated by req.body.userId
 
router.put("/:id/follow", async (req, res) => {
if (req.body.userId !== req.params.id) {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (!user.followers.includes(req.body.userId)) {
      await user.updateOne({ $push: { followers: req.body.userId } });
      await currentUser.updateOne({ $push: { followings: req.params.id } });
      res.status(200).json("user has been followed");
    } else {
      res.status(403).json("you allready follow this user");
    }
  } catch (err) {
    res.status(500).json(err);
  }
} else {
  res.status(403).json("you cant follow yourself");
}
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
if (req.body.userId !== req.params.id) {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (user.followers.includes(req.body.userId)) {
      await user.updateOne({ $pull: { followers: req.body.userId } });
      await currentUser.updateOne({ $pull: { followings: req.params.id } });
      res.status(200).json("user has been unfollowed");
    } else {
      res.status(403).json("you dont follow this user");
    }
  } catch (err) {
    res.status(500).json(err);
  }
} else {
  res.status(403).json("you cant unfollow yourself");
}
});

//get all user
router.get("/", async (req, res) => {
try {
  const data =await User.find();
  res.status(200).json(data);
} catch (err) {
  res.status(404).json(err);
}
});


module.exports =router;