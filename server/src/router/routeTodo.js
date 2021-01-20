const router = require('express').Router()
const todoController = require('../controllers/todo.controller')

router.post('/:username', todoController.authToken, todoController.create)
router.get('/:username', todoController.authToken, todoController.getTodos)
router.put('/:username/:id', todoController.authToken, todoController.update)
router.delete('/:username/:id', todoController.authToken, todoController.delete)
router.get('/:id', todoController.getOne)

module.exports = router