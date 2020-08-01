const express = require('express');
// const connectDB = require('./config/db');
const path = require('path');
const bluegrass = require('bluegrass.js');
const etsty = require('etsy.js')

require('dotenv').config();


const app = express();

// Connet DB
connectDB();



// Init Middleware
app.use(express.json());





// Define Routes

// Serve Static Assets in Production

// Set static folder

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))