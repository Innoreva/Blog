
//importing all the necessary built in packages
const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const path =require('path')


//importing all the necessary packages which is not built in

const  connection =require('./DatabaseConnection/databse.js');
 
//all routes for user ,post and comment respectively

const userRoute =require('./routes/user.js');
const postroute =require('./routes/post.js');
const commentroute =require('./routes/comment.js');

//intializing  express packag
const app=express();

app.use(cors());
app.use(express.json());
 


//bringing all constants from .env file
dotenv.config()
  
const URL_LINK="URL link of database"

connection(URL_LINK);

const router = express.Router();

app.use('/api/user',userRoute);
app.use('/api/post',postroute);
app.use('/api/comment',commentroute);

app.get("/",(req,res)=>{
    res.send("this is  a blog api ,this is developed for innoreva blog application"); 
})

const port =process.env.PORT;
app.listen(8001 ,()=>console.log(`listening on port at 8001`));