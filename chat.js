const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat');
const authenticatemiddleware = require('../middleware/auth');


router.post('/user/sendmessage',authenticatemiddleware.authenticate,chatController.storemessage);





module.exports = router;
