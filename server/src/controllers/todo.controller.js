const Todo = require('../models/todo.schema')
const User = require('../models/user.schema')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

exports.create = (req, res) => {

    User.findById({ _id: req.todo._id })
        .then(result => {
            console.log(result)
            const todo = new Todo({
                _id: new mongoose.Types.ObjectId(),
                todo: req.body.todo,
                isDone: req.body.isDone,
                username: req.params.username,
                createdAt: new Date(),
                deadline: req.body.deadline
            })

            todo
                .save()
                .then(todo => {
                    console.log(todo)
                    res.status(200).send(todo)
                })
                .catch(err => res.send(err))
        }).catch(err => res.status(500).send(err))
}

exports.getTodos = (req, res) => {
    User.findById({ _id: req.todo._id })
        .then(result => {
            Todo.find({ username: req.params.username }).exec((err, todo) => {
                if (err) {
                    console.log(err)
                    return res.sendStatus(500)
                }
                res.send(todo)
            })
        })
}

exports.update = (req, res) => {

    User.findById({ _id: req.todo._id })
        .then(result => {
            const todo = new Todo({
                _id: req.body._id,
                todo: req.body.todo,
                isDone: req.body.isDone,
            })

            Todo
                .find({ username: result.username })
                .updateOne({ _id: req.params.id }, todo)
                .then((result) => res.status(201).send(todo))
                .catch(err => res.status(500).send(err))
        })
}

exports.getOne = (req, res) => {
    Todo.findOne({ _id: req.params.id })
        .then(result => res.send(result))
        .catch(err => res.send(err))
}

exports.delete = (req, res) => {
    User.findById({ _id: req.todo._id })
        .then(result => {
            Todo.deleteOne({ _id: req.params.id }, (err, result) => {
                if (err)
                    return res.send(err)
                else
                    return res.status(200).send('Todo was be deleted!')
            })
        })
}

exports.authToken = (req, res, next) => {
    const token = req.header('access_token')
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        req.todo = decoded
        next()
    })
}