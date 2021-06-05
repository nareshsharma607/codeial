const Post = require("../models/posts");
const Comment= require('../models/comments');


module.exports.post=function(req,res){
    Post.create({
        content:req.body.content,
        user:req.user._id
    
    },function(err,post){
        if(err){
            console.log("Error in creating user post")
            return;
        } 
         return res.redirect('/')
    })
}

module.exports.destroy=function(req,res){
     Post.findById(req.params.id,function(err,post){
         if(err){
             console.log('error in finding the post')
             return;
         }
         if(post){
             if(post.user == req.user.id){
                 post.remove();
                 Comment.deleteMany({post:req.params.post},function(err){
                     return res.redirect('back')
                 })

             }else{
                return res.redirect('back')

             }
         }else{
            return res.redirect('back')}
     })

}
