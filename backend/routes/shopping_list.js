'use strict'

var express = require('express');
var ShoppingListController = require('../controllers/shopping_list')

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

var md_auth = require('../middleware/authenticated');


router.get('/shoppinglist/:id', md_auth.ensureAuth, ShoppingListController.getShoppingList);
router.get('/shoppinglist', md_auth.ensureAuth, ShoppingListController.getShoppingLists);
//router.put('/items/:id', md_auth.ensureAuth, ItemController.updateItem);
//router.delete('/items/:id', md_auth.ensureAuth, ItemController.deleteItem);
router.post('/shoppinglist', md_auth.ensureAuth, ShoppingListController.addShoppingList);

module.exports = router;