
const express = require('express');
const userController = require('../controllers/authController');

const router = express.Router();

router.post('/signin', userController.signInUser);
router.post('/signup', userController.signUpUser);
router.post('/change_password', userController.changePassword);

module.exports = router;