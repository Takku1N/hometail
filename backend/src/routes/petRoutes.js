
const express = require('express');


const router = express.Router();
const petController = require('../controllers/petController');

const { authenticateToken, isPetOwner, upload } = require('../../middleware');

// get pet ของเราเอง
router.get('/pet/owner/non-adopted', authenticateToken, petController.getPetByOwnerIdNonAdopted);
router.get('/pet/owner/adopted', authenticateToken, petController.getPetByOwnerIdAdopted);
router.get('/pet/owner', authenticateToken, petController.getPetByOwnerId);


router.get('/pet', authenticateToken, petController.getAllPet);

router.post('/pet', authenticateToken, upload.single('image'), petController.createPet);

router.get('/pet/:id', authenticateToken, petController.getPetById);
router.put('/pet/:id', authenticateToken, isPetOwner, upload.single('image'), petController.updatePet);
router.delete('/pet/:id', authenticateToken, isPetOwner, petController.deletePet);


module.exports = router;