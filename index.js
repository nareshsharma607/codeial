const express=require('express');
const path=require('path');

const app=express();
const expressLayouts=require('express-ejs-layouts');
const port=8000;

app.use(expressLayouts);

app.use('/',require('./routes/index'))
app.use(express.static('./assets'))

app.set('layout extractStyles',true)
app.set('layout extractScripts',true)

app.set('view engine','ejs');
app.set('views', './views')

app.listen(port,function(err){
    if(err){
        console.log(`Error:${err}`)
    }
    console.log(`server is running on port:${port}`)
})