
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/signout', authController.signOutUser)

router.post('/signin', authController.signInUser);
router.post('/signup', authController.signUpUser);
router.post('/change_password', authController.changePassword);

module.exports = router;