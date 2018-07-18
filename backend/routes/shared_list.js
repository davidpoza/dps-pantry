'use strict'

var express = require('express');
var SharedListController = require('../controllers/shared_list')

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

var md_auth = require('../middleware/authenticated');


router.get('/sharedlist/:id', md_auth.ensureAuth, SharedListController.getSharedList);
router.get('/sharedlistuser/:user', md_auth.ensureAuth, SharedListController.getSharedListByUser);
router.get('/usersharedlist/:list', md_auth.ensureAuth, SharedListController.getUserBySharedList);
router.get('/sharedlist', md_auth.ensureAuth, SharedListController.getSharedLists);
router.put('/sharedlist/:id', md_auth.ensureAuth, SharedListController.updateSharedList);
router.delete('/sharedlist/:id', md_auth.ensureAuth, SharedListController.deleteSharedList);
router.post('/sharedlist', md_auth.ensureAuth, SharedListController.addSharedList);

module.exports = router;