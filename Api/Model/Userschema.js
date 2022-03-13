const mongoose =  require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    Firstname: {
      type: String,
       
    },
    Lastname: {
      type: String,
       
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 50,
    },
    city: {
      type: String,
      max: 50,
    },
    institution: {
        type: String,
        max: 50,
      },
  },
  { timestamps: true }
);

const  User = mongoose.model("User", UserSchema);

module.exports=User;