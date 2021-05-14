const express=require('express');

const router=express.Router();

const usersControllere= require('../controllers/users_controllere');

router.get('/',usersControllere.users);

module.exports=router;