


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