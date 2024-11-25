const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const cors = require('cors'); 
const db = require('./Backend/config/database');
const session = require('express-session');
const sessionConfig = require('./Backend/config/session');
const app = express();
dotenv.config();

//middleware 
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session(sessionConfig));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
})