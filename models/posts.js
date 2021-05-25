const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    content:{String,
    required:true
},
user:{
    type:mongoose.type.Schema,
    rer:'User'

}
},
{timestamps:true
})

const Post=mongoose.model('Post',postSchema)
module.exports=Post