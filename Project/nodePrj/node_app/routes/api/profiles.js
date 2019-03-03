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

module.exports = router;