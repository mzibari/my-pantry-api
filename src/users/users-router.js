const express = require('express')
const UsersService = require('./users-service')
const usersRouter = express.Router()
const jsonParser = express.json()
const xss = require('xss')
const path = require('path')
const { requireAuth } = require('../middleware/basic-auth')

usersRouter
    .route('/')
    .get((req, res, next) => {
        UsersService.getAllUsers(
            req.app.get('db')
        )
            .then(users => {
                res.json(users)
            })
            .catch(next)
    })

usersRouter
    .route('/:user_id')
    /* .all(requireAuth) */
    .all(checkUserExists)
    .get((req, res) => {
        res.json(res.user)
    })

usersRouter
    .route('/:user_id/items')
    .all(checkUserExists)
    /* .all(requireAuth) */
    .get((req, res, next) => {
        UsersService.getItemsPerUser(
            req.app.get('db'),
            req.params.user_id
        )
            .then(items => {
                res.json(items)
            })
            .catch(next)
    })



async function checkUserExists(req, res, next) {
    try {
        const user = await UsersService.getById(
            req.app.get('db'),
            req.params.user_id
        )

        if (!user)
            return res.status(404).json({
                error: `User doesn't exist`
            })

        res.user = user
        next()
    } catch (error) {
        next(error)
    }
}


module.exports = usersRouter