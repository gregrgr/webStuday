const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//Create Schema
const UserSchema = mongoose.Schema({
    author: ObjectId,
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    passwd:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    identity:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    
});


module.exports = User = mongoose.model("users",UserSchema);