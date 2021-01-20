const User = require('../models/user.schema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

exports.signup = async (req, res) => {
	const usernameExist = await User.findOne({ username: req.body.username })
	if(usernameExist) return res.status(409).send('Username already exist')

	const salt = await bcrypt.genSalt(10)
	const hashedPassword = await bcrypt.hash(req.body.password, salt)

	const user = new User({	
		_id: new mongoose.Types.ObjectId(),
		username: req.body.username,
		password: hashedPassword,
	})	

	try {
		const savedUser = user.save()
		res.send({ user: user._id })	
	} catch (err) {
		res.status(400).send(err)
	}
}

exports.signin = async (req, res) => {
	const user = await User.findOne({ username: req.body.username })
	if(!user) return res.status(400).send('Username is not found') 

	const validPass = await bcrypt.compare(req.body.password, user.password)
	if(!validPass) return res.status(400).send('Invalid password')

	const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)

	const userToSend = Object.assign({}, user._doc)
	delete userToSend.password
	res.header('access_token', token).json({ token, user: { ...userToSend } })
}

exports.getUsers = (req, res) => {

}

exports.update = (req, res) => {

}

exports.getOneUser = (req, res) => {

}

exports.delete = (req, res) => {

}