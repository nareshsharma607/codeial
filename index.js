const express=require('express');
const path=require('path');

const app=express();
const expressLayouts=require('express-ejs-layouts');
const port=8000;
const cookieParser=require('cookie-parser');
const db=require('./config/mongoose');
 const User=require('./models/users');

//used for session cookie
const session=require('express-session');
const passport =require('passport')
const passportLocal=require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware=require('node-sass-middleware')

app.use(sassMiddleware({
    src:'./assets/sass',
    dest:'./assets/css',
    debug:true,
    outputStyle:'expanded',
    prefix:'/css'
}))
app.use(expressLayouts);

app.use(cookieParser());
app.use(express.urlencoded());

app.use(express.static('./assets'))

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)


//set up the view engine
app.set('view engine','ejs');
app.set('views', './views')


//middleware that takes in the cookie and encrypts it 
app.use(session({
    name:'codeial',

    secret:"abcd",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
     },
     store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect mongo db setup ok');
    }

    )
    //  store: 
    //      new MongoStore({'db': 'sessions',autoRemove:'disabled'},{
    //          if(err){
    //             return console.log(err || 'connect momgodb setup ok')
    //          }
    //    })
    
}))


app.use(passport.initialize())
app.use(passport.session());
app.use(passport.setAuthenticationUser)
app.use('/',require('./routes/index'))

app.listen(port,function(err){
    if(err){
        console.log(`Error:${err}`)
    }
    console.log(`server is running on port:${port}`)
})