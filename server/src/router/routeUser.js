const router = require('express').Router()
const userController = require('../controllers/user.controller')

router.post('/signup', userController.signup)
router.post('/signin', userController.signin)
router.get('/', userController.getUsers)
router.put('/:id', userController.update)
router.delete('/:id', userController.delete)
router.get('/:id', userController.getOneUser)

module.exports = router