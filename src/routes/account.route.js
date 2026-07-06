const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware')
const accountController = require('../controller/account.controller')


// Create new account API

router.post('/',authMiddleware, accountController.createAccountController)

module.exports = router;