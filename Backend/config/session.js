require('dotenv').config();

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: true,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000*60*60*24
    }
};

module.exports = sessionConfig;