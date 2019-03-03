const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require("body-parser");

const users = require('./routes/api/users')
const db_url = require('./config/keys').mongoURI;

const app = express();

app.get('/',(require,response)=>{
    response.send("Hello World");
    console.log(client);
})


const port = process.env.PORT || 5000;

// 链接数据库
MongoClient.connect(
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

//$route  GET api/users/test
//@desc   返回的请求json的数据
//@access public
 app.use("/api/users",users);

app.listen(port,()=>{
    console.log('Server running on port %s',port);
})



