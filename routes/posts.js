const express=require('express');

const router=express.Router()
const passport=require('passport')
const postsController=require('../controllers/postController');
router.post('/create',passport.checkAuthentication,postsController.post);
router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy)

 module.exports=router