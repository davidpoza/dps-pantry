'use strict'

var express = require('express');
var ListController = require('../controllers/list')

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

var md_auth = require('../middleware/authenticated');

router.get('/lists', md_auth.ensureAuth, ListController.getLists);
//router.get('/lists/:id', ListController.getList);
//router.put('/lists/:id', md_auth.ensureAuth, ListController.updateList);
//router.delete('/lists/:id', ListController.deleteList);
router.post('/lists', md_auth.ensureAuth, ListController.addList);


module.exports = router;