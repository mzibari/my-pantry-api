require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const usersRouter = require('./users/users-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
console.log('app console log just before app.use')
app.get('/', (req, res) => {
    res.send('Hello, boilerplate!')
})
app.use('/api/users', usersRouter)

app.use(function errorHandler(error, req, res, next) {
    let response
    console.error(error)
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app