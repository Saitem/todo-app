require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const morgan = require('morgan')

const app = express()
const PORT = process.env.PORT|| 5000

const baseUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o5e2x.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const todoRouter = require('./router/routeTodo')
const userRouter = require('./router/routeUser.js')

mongoose.connect(baseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(item => {
    console.log('Connected')
}).catch(err => {
    console.log('Caught', err.stack)
})

app.use(cors())
app.use(morgan('dev'))

app.use(express.json())

app.use('/api/todo', todoRouter)
app.use('/api/user', userRouter)
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => console.log(`Server working on port ${PORT}`))