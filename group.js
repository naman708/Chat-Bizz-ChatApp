const express = require('express');
const router = express.Router();
const groupController = require('../controllers/group');
const authenticatemiddleware = require('../middleware/auth');


router.post('/user/creategroup',authenticatemiddleware.authenticate,groupController.creategroup);
router.get('/user/getgroups',authenticatemiddleware.authenticate,groupController.getgroups);




module.exports = router;
