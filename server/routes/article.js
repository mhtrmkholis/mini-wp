const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/article-controller');
const Upload = require('../middlewares/upload');
const authorize = require('../middlewares/authorize');

router.post('/', Upload.multer.single('image'), Upload.sendUploadToGCS, ArticleController.create);
router.get('/', ArticleController.findAll);
router.get('/myArticles', ArticleController.findMyArticles);
router.get('/:id', ArticleController.findOne);
router.put('/:id', ArticleController.update)
router.patch('/:id', ArticleController.update);
router.delete('/:id', ArticleController.destroy);
router.get('/search', ArticleController.search);

module.exports = router