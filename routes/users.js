const express=require('express');

const router=express.Router();

const usersController= require('../controllers/users_controllere');

router.get('/',usersController.users);
router.get('/sign_up',usersController.sign_up)
router.get('/sign_in',usersController.sign_in)
router.post('/create',usersController.create)
router.post('/session',usersController.createSession)

module.exports=router;