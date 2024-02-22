const express = require('express')
const userController = require('../controller/task');
const { validateUserToken } = require('../middleware/middleware')
const router = express.Router()

router.get('/tasks', validateUserToken, userController.getTask)

router.post('/tasks', validateUserToken, userController.putTask)

module.exports = router;