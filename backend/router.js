const express = require('express')
const router = express.Router()
const controller = require('./controller')


// get a specific board
router.get('/board/:id', controller.getBoard)

// get all columns from a board
router.get('/column/:boardid', controller.getColumns)

// get all tasks for a column in a board
router.get('/task/:columnid', controller.getTasks)

module.exports = router