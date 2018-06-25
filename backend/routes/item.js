'use strict'

var express = require('express');
var ItemController = require('../controllers/item')

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

var md_auth = require('../middleware/authenticated');


router.get('/items', md_auth.ensureAuth, ItemController.getItems);
router.get('/items/:id', md_auth.ensureAuth, ItemController.getItem);
router.put('/items/:id', md_auth.ensureAuth, ItemController.updateItem);
router.delete('/items/:id', md_auth.ensureAuth, ItemController.deleteItem);
router.post('/items', md_auth.ensureAuth, ItemController.addItem);

module.exports = router;