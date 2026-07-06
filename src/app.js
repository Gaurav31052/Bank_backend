require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const dns = require('dns');
const authRoutes = require('./routes/auth.routes.js');
const accountRoutes = require('./routes/account.route.js');

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
]);

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());

// routes used

app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);



module.exports = app;