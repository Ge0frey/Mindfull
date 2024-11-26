const express = require('express');
const router = express.Router();
const therapistController = require('../controllers/therapistController');

router.post('/', therapistController.createTherapist);
router.get('/', therapistController.getAllTherapists);
router.put('/:id', therapistController.updateTherapist);
router.delete('/:id', therapistController.deleteTherapist);

module.exports = router;