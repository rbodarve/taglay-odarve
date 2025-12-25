const express = require('express');
const { getArticles, createArticle, updateArticle, toggleArticleStatus, getArticleByName, deleteArticle } = require('../controllers/articleController');

const router = express.Router();

// get articles method
router.get('/', getArticles);

// post - create article
router.post('/', createArticle);

// put and patch - update article
router.put('/:id', updateArticle);
router.patch('/:id/toggle', toggleArticleStatus);

// delete article
router.delete('/:id', deleteArticle);

// get by name
router.get('/:name', getArticleByName);

module.exports = router;