const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const cors = require('cors'); 
const db = require('./Backend/config/database');
const session = require('express-session');
const sessionConfig = require('./Backend/config/session');
const app = express();

const authRoutes = require("./Backend/routes/authRoutes");
const appoinmentsRoutes = require('./Backend/routes/appointmentRoutes');
const therapistsRoutes = require('./Backend/routes/therapistRoutes');

dotenv.config();

//middleware 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session(sessionConfig));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appoinmentsRoutes);
app.use('/api/doctors', therapistsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
})