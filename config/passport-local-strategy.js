const passport=require('passport');

const LocalStrategy=require('passport-local').Strategy;

const User=require('../models/users');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',

},function(email,password,done){
   User.findOne({email:email},function(err,user){
        if(err){
            console.log('error in finding user -->passport');
            return done(err);
        }
        if(!user || user.password!=password){
            console.log('Invalid username/password');
            return done(null,false);
        }
        return done(null,user);

   });
}
));

//serialisind the user to deciede which  key is kept  in cookie

passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserialising the use from the key in the cookie
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user -->passport');
            return done(err);
        }
        return done(null,user);
    })
})

passport.checkAuthentication=function(req,res,next){
  //if user is signed in passed on request to next function(controllers action)
    if(req.isAuthenticated()){
      return next()
  }
  //if user is not signed in
  return res.redirect('/users/sign_in');
}
passport.setAuthenticationUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie we are just sending this to the locals for the views
        res.locals.user=req.user;
    }
    next()
}

module.exports=passport;