const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

//Create Profile
const ProfileSchema = mongoose.Schema({
    // type: ObjectId,
    type:{
        type:String
    },
    describe:{
        type:String
    },
    income:{
        type:String,
        require:true
    },
    expend:{
        type:String,
        require:true
    },
    cash:{
        type:String,
        require:true
    },
    remark:{
        type:String
    },
    data:{
        type:String
    }
});


module.exports = Profile = mongoose.model("profile",ProfileSchema);