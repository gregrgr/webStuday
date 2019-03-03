const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');

const db_url = require('./config/keys').mongoURI;


const app = express();

// app.get('/',(require,response)=>{
//     response.send("Hello World");
//     console.log(client);
// })


const port = process.env.PORT || 5000;

// 链接数据库
mongoose.connect(
  db_url,{ 
    useNewUrlParser: true 
  }).then(() => {
  console.log('MonogoDB connect');
 }) .catch(err => {
  console.log(err);
 });

//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/api/users",users);
app.use("/api/profiles",profiles);
//passport初始化
app.use(passport.initialize());

require("./config/passport")(passport);

//$route  GET api/users/test
//@desc   返回的请求json的数据
//@access public
 

app.listen(port,()=>{
    console.log('Server running on port %s',port);
})



