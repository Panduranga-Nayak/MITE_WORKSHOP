const express = require('express')
const userController = require('../controller/user');
const router = express.Router()

router.post('/createUser', userController.createUser)

router.post('/login', userController.login)

module.exports = router;