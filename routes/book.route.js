const express = require('express');
const router = express.Router();

const { getBookValidation, addBookValidation, updateBookValidation, deleteBookValidation } = require('../middleware/book.middleware');

const { getBooks, getBook, addBook, updateBook, deleteBook } = require('../controllers/book.controller');

/* All Book HTTP Requets */
router.get('/', getBooks);
router.get('/:_id', getBookValidation, getBook);
router.post('/', addBookValidation, addBook);
router.patch('/:_id', updateBookValidation, updateBook);
router.delete('/:_id', deleteBookValidation, deleteBook);

module.exports = router;
