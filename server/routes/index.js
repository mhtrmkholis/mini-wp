const express = require('express');
const router = express.Router();
const article = require('./article');
const user = require('./user');
const authenticate = require('../middlewares/authenticate');
const tag = require('./tag');

router.use('/users', user);
router.use('/articles', authenticate, article);
router.use('/tags', authenticate, tag);

module.exports = router