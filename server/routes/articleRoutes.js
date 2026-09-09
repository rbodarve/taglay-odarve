const express = require('express');
const { getArticles, createArticle, updateArticle, toggleArticleStatus, getArticleByName, deleteArticle } = require('../controllers/articleController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// get articles method (public)
router.get('/', getArticles);

// post - create article (protected)
router.post('/', protect, createArticle);

// put and patch - update article (protected)
router.put('/:id', protect, updateArticle);
router.patch('/:id/toggle', protect, toggleArticleStatus);

// delete article (protected)
router.delete('/:id', protect, deleteArticle);

// get by name (public)
router.get('/:name', getArticleByName);

module.exports = router;