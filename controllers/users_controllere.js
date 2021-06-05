const User=require('../models/users')
const Post=require('../models/posts')


module.exports.users=function(req,res){
    console.log(req.cookies)
    
    Post.find({}).populate('user').exec(function(err,posts){
        res.render('home',{
            title:'codeial |Home',
            posts:posts,
        
        } )  
          
    })
    ;
    
}
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        res.render('profile',{
            title:"profile",
            user_profile:user
        });
    })
    
   
}
module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
    User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
       return res.redirect('back')
    })
}else{
    return res.status(401).send('unautherise')
}
} 

module.exports.sign_up=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    
    res.render('users_sign_up',{
        title:'user|sign up'
    })
}
module.exports.sign_in=function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile')
    }
    res.render('users_sign_in',{
        title:'user|sign in'
    })
}

module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
    return res.redirect('back');}
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("Error in finding user in signUp") 
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log("Error in creating user in signUp")
                    return;
                } 
                 return res.redirect('/users/sign_in')

            })

        }
        else{
            return  res.redirect("back")
        }
    })
}
module.exports.createSession=function(req,res){
    return res.redirect('/');
}
module.exports.destroySession=function(req,res){
    req.logout();
    res.redirect('/');
}