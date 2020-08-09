const express = require('express')
const UsersService = require('./users-service')
const usersRouter = express.Router()
const jsonParser = express.json()
const xss = require('xss')
const path = require('path')
const { requireAuth } = require('../middleware/basic-auth')
const { PORT, DATABASE_URL } = require('./config')
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
})

//GET/users endpoint, get all users
usersRouter
    .route('/')
    .get((req, res, next) => {
        console.log('/api/users/ endpoint in user-router')
        UsersService.getAllUsers(
            /* req.app.get('db') */db
        )
            .then(users => {
                res.json(users)
            })
            .catch(next)
    }) 
    //POST/users endpoint, new user
    .post(jsonParser, (req, res, next) => {
        const { username, email, user_password } = req.body
        if (!username || !email || !user_password) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain username, email, and password`
                }
            })
        }
        const userToAdd = {
            username,
            email,
            user_password,
        }
        UsersService.addUser(
            /* req.app.get('db') */db,
            userToAdd
        )
            .then(user => {
                res.status(201)
                    .location(path.posix.join(req.originalUrl + `/${user.id}`))
                    .json(user)
            })
            .catch(next)
    })

//GET/users/user_id endpoint, get user
usersRouter
    .route('/:user_id')
    .all(checkUserExists)
    .get((req, res) => {
        res.json(res.user)
    })
    //DELETE/users/user_id endpoint, delete user
    .delete((req, res, next) => {
        UsersService.deleteUser(
            /* req.app.get('db') */db,
            req.params.user_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })


//GET/users/user_id/items endpoint, get all items for user
usersRouter
    .route('/:user_id/items')
    .all(checkUserExists)
    .get((req, res, next) => {
        UsersService.getItemsPerUser(
            /* req.app.get('db') */db,
            req.params.user_id
        )
            .then(items => {
                res.json(items)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { item_name, quantity, item_type, expiration } = req.body
        if (!item_name || !quantity || !item_type || !expiration) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain item_name, quantity, item_type, and expiration`
                }
            })
        }
        const usrid = req.params.user_id
        const itemToAdd = {
            usrid,
            item_name,
            quantity,
            item_type,
            expiration
        }
        UsersService.addItem(
            /* req.app.get('db') */db,
            itemToAdd
        )
            .then(item => {
                res.status(201)
                    .location(path.posix.join(req.originalUrl + `/${item.id}`))
                    .json(item)
            })
            .catch(next)
    })

usersRouter
    .route('/:user_id/items/:item_id')
    .all(checkUserExists)
    .get((req, res, next) => {
        UsersService.getItemById(
            /* req.app.get('db') */db,
            req.params.item_id,
            req.params.user_id,
        )
            .then(item => {
                res.json(item)
            })
            .catch(next)
    })
    .delete((req, res, next) => {
        UsersService.deleteItem(
            /* req.app.get('db') */db,
            req.params.item_id
        )
            .then(item => {
                res.status(204)
                    .location(path.posix.join(req.originalUrl + `/${item.id}`))
                    .json(item)
            })
            .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const { item_name, quantity, item_type, expiration } = req.body
        const itemToUpdate = { item_name, quantity, item_type, expiration }
        const numberOfValues = Object.values(itemToUpdate).filter(Boolean).length
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain either item_name, quantity, item_type or expiration`
                }
            })
        }
        UsersService.updateItem(
            /* req.app.get('db') */db,
            req.params.item_id,
            itemToUpdate
        )
            .then(item => {
                res.status(204)
                    .location(path.posix.join(req.originalUrl + `/${item.id}`))
                    .json(item)
            })
            .catch(next)
    })


async function checkUserExists(req, res, next) {
    try {
        const user = await UsersService.getById(
            /* req.app.get('db') */db,
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