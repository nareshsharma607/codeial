const Comment=require('../models/comments')
const Post = require('../models/posts')
module.exports.create=function(req,res){
    console.log(req.body.post)
    Post.findById(req.body.post,function(err,post){
        if(err){
            console.log('error in finding post')
            return;
        }
        if(post){
    Comment.create({
          content:req.body.comment,
          user:req.user._id,
          post:req.body.post
    
    },function(err,comment){
        if(err){
            console.log("error in creating commet")
            return;
        }
        post.comments.push(comment);
        post.save()
        return res.redirect('back')
    })}
    })
}
module.exports.destroyComment=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user == req.user.id){
            comment.remove();

            let postId=comment.post;

            Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
                return res.redirect('back')
            })
                
              
        } else{
            return res.redirect('back')
        }})
       
    
}