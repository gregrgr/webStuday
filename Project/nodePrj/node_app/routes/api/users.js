//@login &register
const express = require('express');
const router = express.Router();

const User = require("../../models/User");

//$route  GET api/users/test
//@desc   返回的请求json的数据
//@access public
router.get("/test",(request,response)=>{
    response.json({msg:"login works"})
})

//$route  POST api/users/register
//@desc   返回的请求json的数据
//@access public
router.post("/register",function(request,response){
    // console.log(request.body);
    //查询数据库是否拥有邮箱
    User.findOne({email:request.body.email})
    .then((user)=>{
        if(user){
            return request.status(400).json({email:'邮箱被占用'})
        }else{
            const newUser =  new User({
                name:request.body.name,
                email:request.body.email,
                avatar,
                password:request.body.password
            })
        }
    })
})

module.exports = router;