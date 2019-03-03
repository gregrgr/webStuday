const mongoose = require("mongodb");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
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
    avater:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    
});


module.exports = User = mongoose.model("users",UserSchema);