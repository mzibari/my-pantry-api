const express = require('express')
const ItemsService = require('./items-service')
const itemsRouter = express.Router()
const jsonParser = express.json()
const path = require('path')


//GET/users endpoint, get all items
itemsRouter
    .route('/')
    .get((req, res, next) => {
        ItemsService.getAllItems(
            req.app.get('db')
        )
            .then(items => {
                res.json(items)
            })
            .catch(next)
    })

module.exports = itemsRouter