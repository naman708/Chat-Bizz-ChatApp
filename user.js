const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const authenticatemiddleware = require('../middleware/auth');


router.post('/user/registeruser',userController.adduser);
router.get('/user/existinguser/:id',userController.findingexistinguser);
router.post('/user/login',userController.loginuser);





module.exports = router;
