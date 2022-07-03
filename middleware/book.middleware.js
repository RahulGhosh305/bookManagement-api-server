const Joi = require('joi');
const { validate } = require("../validations/validate");

const getBook = {
    params: Joi.object({
        _id: Joi.string().required()
    })
}

const addBook = {
    body: Joi.object({
        bookName: Joi.string().required(),
        authorName: Joi.string().required(),
        price: Joi.string().required(),
    })
}

const updateBook = {
    params: Joi.object({
        _id: Joi.string().required()
    }),
    body: Joi.object({
        bookName: Joi.string().required(),
        authorName: Joi.string().required(),
        price: Joi.string().required(),
    })
}

const deleteBook = {
    param: Joi.object({
        _id: Joi.string().required()
    })
}



module.exports = {
    getBookValidation: validate(getBook),
    addBookValidation: validate(addBook),
    updateBookValidation: validate(updateBook),
    deleteBookValidation: validate(deleteBook)
}