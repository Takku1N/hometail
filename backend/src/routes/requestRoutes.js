
const express = require('express');

const router = express.Router();
const requestController = require('../controllers/requestController');

const { authenticateToken } = require('../../middleware');

// approve เเละ reject request ที่คนอื่นส่งมาให้ owner
router.put('/request/approve/:id', authenticateToken, requestController.approveRequest);
router.put('/request/reject/:id',  requestController.rejectRequest);

// get request ที่คนอื่นส่งมาให้เรา
router.get('/request/owner', authenticateToken, requestController.getRequestByOwnerId);

// get request ที่เราเป็นคนส่งไป
router.get('/request/myrequest', authenticateToken, requestController.getMyRequest);

router.post('/request/:id', authenticateToken, requestController.createRequest);


module.exports = router;