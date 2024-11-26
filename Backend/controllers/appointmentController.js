const Appointment = require('../models/appointmentsModel');

exports.bookAppointment = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ 
      message: 'Authentication required. Please log in to book appointments.' 
    });
  }

  try {
    const userId = req.session.userId;
    const { therapist_id, appointment_date, appointment_time } = req.body;

    if (!therapist_id || !appointment_date || !appointment_time) {
      return res.status(400).json({ 
        message: 'Missing required fields',
        received: { therapist_id, appointment_date, appointment_time }
      });
    }

    const appointmentId = await Appointment.create(
      userId, 
      therapist_id, 
      appointment_date, 
      appointment_time
    );

    res.status(201).json({ 
      message: 'Appointment booked successfully',
      appointmentId 
    });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ 
      message: 'Error booking appointment',
      error: error.message 
    });
  }
};

exports.getUserAppointments = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    const appointments = await Appointment.findByUserId(req.session.userId);
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
};

exports.updateAppointment = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  const { date, time } = req.body;
  const appointmentId = req.params.id;
  
  try {
    await Appointment.update(appointmentId, req.session.userId, { date, time });
    res.json({ message: 'Appointment updated successfully' });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Error updating appointment' });
  }
};

exports.cancelAppointment = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  const appointmentId = req.params.id;
  
  try {
    await Appointment.delete(appointmentId, req.session.userId);
    res.json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ message: 'Error cancelling appointment' });
  }
};