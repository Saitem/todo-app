// const app = require('express')().
// app.l1

const mongoose = require('mongoose')
const { Schema } = mongoose
const ObjectId = Schema.ObjectId

const TodoSchema = new Schema({
    _id: {
        type: ObjectId,
        required: true
    },
    todo: {
        type: String,
        // required: true,
    },
    isDone: Boolean,
    username: {
        type: String
    },
    createdAt: {
        type: Date
    },
    deadline: {
        type: Date
    }
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = Todo