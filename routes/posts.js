const express=require('express');

const router=express.Router()
const passport=require('passport')
const postsController=require('../controllers/postController');
router.post('/create',passport.checkAuthentication,postsController.post);


 module.exports=router