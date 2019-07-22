const express = require('express');
const router = express.Router();
const TagController = require('../controllers/tag-controller');

router.get('/', TagController.findAll);
router.post('/', TagController.create);
router.get('/search', TagController.findOne);

module.exports = router;