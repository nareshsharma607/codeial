const express=require('express');

const router=express.Router()

 const homeController=require('../controllers/home_controller');
 

console.log('router loaded')

router.get('/',homeController.home);

router.use('/posts',require('./posts'))
router.use('/users',require('./users'))
router.use('/comment',require('./comments'))




module.exports=router