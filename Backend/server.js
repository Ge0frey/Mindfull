const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser')
const cors = require('cors'); 
const path = require('path');
const db = require('./config/database');
const session = require('express-session');
const sessionConfig = require('./config/session');
const app = express();

const authRoutes = require("./routes/authRoutes");
const appoinmentsRoutes = require('./routes/appointmentRoutes');
const therapistsRoutes = require('./routes/therapistRoutes');

//middleware 
app.use(cors({
    origin: ["https://mindfull-psychotherapy.vercel.app"],
    methods:["POST", "GET"],
    credentials:true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session(sessionConfig));

app.use(express.static(path.join(__dirname, '..', 'Frontend')));
app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'Frontend','index.html'));
});

//routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appoinmentsRoutes);
app.use('/api/therapists', therapistsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
})