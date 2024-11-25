const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const db = require('./Backend/config/database')
const app = express();

app.get("/", (req,res) => {
    res.send("Hello from the server")
})



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
})