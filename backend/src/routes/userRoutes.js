
const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken, isAdmin, upload } = require('../../middleware')

const router = express.Router();



// get my profile
router.get('/user/profile', authenticateToken, userController.getMyProfile);

router.put('/user/editprofile', authenticateToken, upload.single('image'), userController.updateMyProfile);
// ban user (admin only)
router.put('/user/ban/:id', authenticateToken, isAdmin, userController.banUser);
router.put('/user/unban/:id', authenticateToken, isAdmin, userController.unbanUser);

//  delete user (admin only)
router.delete('/user/:id', authenticateToken, isAdmin, userController.deleteUser);

// get all user(admin only)
router.get('/user', authenticateToken, isAdmin, userController.getUsers);




module.exports = router;