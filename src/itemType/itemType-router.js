const express = require('express')
const ItemTypeService = require('./itemType-service')
const itemTypeRouter = express.Router()
const jsonParser = express.json()
const path = require('path')


//GET/users endpoint, get all itemType
itemTypeRouter
    .route('/')
    .get((req, res, next) => {
        ItemTypeService.getAllItemType(
            req.app.get('db')
        )
            .then(itemType => {
                res.json(itemType)
            })
            .catch(next)
    })

module.exports = itemTypeRouter