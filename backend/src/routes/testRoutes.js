
const express = require('express');
const testController = require('../controllers/testController');

const router = express.Router();

router.get('/users', testController.getUsers);
router.get('/user/:id', testController.getUserById);
router.post('/users', testController.createUser);
router.put('/user/:id', testController.updateUser);
router.delete('/user/:id', testController.deleteUser);

module.exports = router;