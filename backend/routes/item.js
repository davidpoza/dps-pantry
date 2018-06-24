'use strict'

var express = require('express');
var ItemController = require('../controllers/item')

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/items', ItemController.getItems);
router.get('/items/:id', ItemController.getItem);
router.put('/items/:id', ItemController.updateItem);
router.delete('/items/:id', ItemController.deleteItem);
router.post('/items', ItemController.addItem);

module.exports = router;