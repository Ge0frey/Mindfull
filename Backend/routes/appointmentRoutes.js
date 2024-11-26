const express = require('express');
const router = express.Router();
const appoinmentsController = require('../controllers/appointmentController');
const { requireAuth } = require('../middleware/auth');

router.use(requireAuth);

router.post('/', appoinmentsController.bookAppointment);
router.get('/', appoinmentsController.getUserAppointments);
router.put('/:id', appoinmentsController.updateAppointment);
router.delete('/:id', appoinmentsController.cancelAppointment);

module.exports = router;