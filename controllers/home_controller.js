const Post = require("../models/posts");
// const User=require('../models/users')


    
    

module.exports.home=function(req,res){
    Post.find({}).populate('user').exec(function(err,posts){
        res.render('home',{
            title:'codeial |Home',
            posts:posts,
        
        } )  
    })
    ;
}
