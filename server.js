require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
const connectDB = require('./config/db');
connectDB();

//Cors
const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
}
// app.use(function (request, response, next) {
//     response.header("Access-Control-Allow-Origin", "*");
//     response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

//Template engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//Routes
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})