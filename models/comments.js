const mongoose=require('mongoose');

const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //comments blongs to a user
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //comments on which post
    posts:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{timestamps:true})
 

const Comment=mongoose.model('Comment',commentSchema);

module.exports=Comment;