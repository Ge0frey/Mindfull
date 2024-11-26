const Therapist = require('../models/therapistsModel');

exports.createTherapist = async (req, res) => {
  if (req.session.userRole !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  
  const { name, specialization, schedule } = req.body;
  
  try {
    const therapistId = await Therapist.create(name, specialization, schedule);
    res.status(201).json({ message: 'Therapist added successfully', therapistId });
  } catch (error) {
    console.error('Error adding therapist:', error);
    res.status(500).json({ message: 'Error adding therapist' });
  }
};

exports.getAllTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.findAll();
    res.json(therapists);
  } catch (error) {
    console.error('Error fetching therapists:', error);
    res.status(500).json({ message: 'Error fetching therapists' });
  }
};

exports.updateTherapist = async (req, res) => {
  if (req.session.userRole !== 'admin' && req.session.userRole !== 'therapist') {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  
  const { name, specialization, schedule } = req.body;
  const therapistId = req.params.id;
  
  try {
    await Therapist.update(therapistId, { name, specialization, schedule });
    res.json({ message: 'Therapist updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating therapist' });
  }
};

exports.deleteTherapist = async (req, res) => {
  if (req.session.userRole !== 'admin') {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  
  const therapistId = req.params.id;
  
  try {
    await Therapist.delete(therapistId);
    res.json({ message: 'Therapist deleted successfully' });
  } catch (error) {
    console.error('Error deleting therapist:', error);
    res.status(500).json({ message: 'Error deleting therapist' });
  }
};