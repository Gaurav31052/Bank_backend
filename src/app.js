require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const dns = require('dns');
const authRoutes = require('./routes/auth.routes.js');

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);



module.exports = app;