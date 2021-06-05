const Post = require("../models/posts");
const User=require('../models/users')


    
    

module.exports.home= async function(req,res){
    try{
        let posts = await Post.find({})
        .populate('user').
        populate({
            path:'comments',
           populate: {
                path:'user'
            }
        })
    
          let users=await  User.find({});
          res.render('home',{
            title:'codeial |Home',
            posts:posts,
            all_users:users
        } )  
    }catch(err){
        console.log('Error',err);
      return;
    }
   
}
