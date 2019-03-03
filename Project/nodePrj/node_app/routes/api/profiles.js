//@login &register
const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");

const Profile = require("../../models/Profile");


const passport = require("passport");

const jwt = require('jsonwebtoken');

//$route  GET api/users/test
//@desc   返回的请求json的数据
//@access public
router.get("/test",(request,response)=>{
    response.json({msg:"profile works"})
})

//$route  POST api/users/add
//@desc   创建信息借口
//@access private
router.post(
    "/add",
    passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profileFields = {};
    if(req.body.type)profileFields.type = req.body.type;
    if(req.body.describe)profileFields.describe = req.body.describe;
    if(req.body.income)profileFields.income = req.body.income;
    if(req.body.expend)profileFields.expend = req.body.expend;
    if(req.body.cash)profileFields.cash = req.body.cash;
    if(req.body.remark)profileFields.remark = req.body.remark;

    new Profile(profileFields).save().then(profile=>{
        res.json(profile); 
    });
});


//$route  POST api/users/profiles
//@desc   获取所有信息
//@access private
router.get(
    "/",
    passport.authenticate("jwt",{session:false}),(req,res)=>{
        Profile.find()
        .then(profile=>{
            if(!profile){
                return res.status(404).json('Nothing');
            }
            res.json(profile);
        })
        .catch(err=>{
            res.status(404).json(err);
        })
    }
)

//$route  POST api/users/:id
//@desc   获取单条信息
//@access private
router.get(
    "/:id",
    passport.authenticate("jwt",{session:false}),(req,res)=>{
        Profile.find({_id:req.params.id})
        .then(profile=>{
            if(!profile){
                return res.status(404).json('Nothing');
            }
            res.json(profile);
        })
        .catch(err=>{
            res.status(404).json(err);
        })
    }
)

//$route  POST api/users/edit
//@desc   修改单条信息
//@access private
router.post(
    "/edit/:id",
    passport.authenticate("jwt",{session:false}),(req,res)=>{
    const profileFields = {};
    if(req.body.type)profileFields.type = req.body.type;
    if(req.body.describe)profileFields.describe = req.body.describe;
    if(req.body.income)profileFields.income = req.body.income;
    if(req.body.expend)profileFields.expend = req.body.expend;
    if(req.body.cash)profileFields.cash = req.body.cash;
    if(req.body.remark)profileFields.remark = req.body.remark;

    Profile.findOneAndUpdate(
        {_id:req.params.id},
        {$set:profileFields},
        {new:true}
    ).then(profile=>{
        res.json(profile)
    })
});

//$route  POST api/users/delet
//@desc   删除单条信息
//@access private
router.delete(
    "/delete/:id",
    passport.authenticate("jwt",{session:false}),(req,res)=>{

    Profile.findOneAndRemove(
        {_id:req.params.id}
    ).then(profile=>{
        profile.save().then(profile=>res.json(profile))
    }).catch(err=>res.status(404).json("删除失败"))
});

module.exports = router;