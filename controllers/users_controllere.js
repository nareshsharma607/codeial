const User=require('../models/users')


module.exports.users=function(req,res){
    console.log(req.cookies)
    res.render('home',{
        title:'users'
    })
    
}
module.exports.profile=function(req,res){
    res.render('profile',{
        title:"profile"
    });
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