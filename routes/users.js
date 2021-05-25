const express=require('express');

const router=express.Router();
const passport=require('passport');

const usersController= require('../controllers/users_controllere');

router.get('/',usersController.users);
router.get('/sign_up',usersController.sign_up)
router.get('/sign_in',usersController.sign_in)
router.get('/profile',passport.checkAuthentication,usersController.profile)
router.get('/sign_out',usersController.destroySession)
router.post('/create',usersController.create)
router.post('/session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign_in'}
),usersController.createSession)

module.exports=router;