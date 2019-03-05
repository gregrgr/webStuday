//@login &register
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../../models/User");
const gravatar = require('gravatar');

const passport = require("passport");

const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
//$route  GET api/users/test
//@desc   返回的请求json的数据
//@access public
// router.get("/test",(request,response)=>{
//     response.json({msg:"login works"})
// })

//$route  POST api/users/register
//@desc   返回的请求json的数据
//@access public
router.post("/register",(req,res)=>{
    // console.log(request.body);
    //查询数据库是否拥有邮箱
    // console.log(request.json);
    User.findOne({
        email:req.body.email
    }).then((user)=>{
        if(user){
            return res.status(400).json('邮箱被占用')
        }else{
            var avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
            const newUser =  new User({
                name:req.body.name,
                email:req.body.email,
                avatar,
                passwd:req.body.passwd,
                identity:req.body.identity
            });
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.passwd, salt, (err, hash)=>{
                    // Store hash in your password DB.
                    if(err){
                        throw err;
                    }
                    newUser.passwd = hash;
                    newUser.save()
                    .then(user=>{
                        res.json(user);
                    })
                    .catch(err=>{
                        console.log(err);
                    });
                });
            });
        }
    })
})


//$route  POST api/users/login
//@desc   返回token jwt passport
//@access public
router.post("/login",(req,res)=>{
    const email = req.body.email;
    const passwd = req.body.passwd;
    //查询数据库
    User.findOne({email})
    .then(user=>{
        if(!user){
            return res.status(404).json("用户不存在");
        }
        //密码匹配
        bcrypt.compare(passwd, user.passwd).then(isMatch=>{
        if(isMatch){
            // res.json({msg:"success"});
            const rule = {
                id:user.id,
                name:user,
                avatar:user.avatar,
                identity:user.identity
            };
            jwt.sign(rule, keys.secretOrKey,{expiresIn:1000},(err,token)=>{
                res.json({
                    success:true,
                    token:"Bearer "+token
                })
            });
        }else{
            return res.status(400).json("密码错误");
        }
    })
    })
});

//$route  GET api/users/current
//@desc   return current user
//@access private
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity
    });
   
})

module.exports = router;