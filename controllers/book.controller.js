const httpStatus = require("http-status");
const apiResponse = require("../utils/apiResponse");
const catchAsync = require("../utils/catchAsync");

const { BookModel } = require('../models/book.model');

const getBooks = catchAsync(async (req, res, next) => {
    const books = await BookModel.find({}, { bookName: true, authorName: true, price: true });
    return apiResponse(res, httpStatus.OK, { data: books });
})

const getBook = catchAsync(async (req, res, next) => {
    const book = await BookModel.findOne({ _id: req.params._id }, { bookName: true, authorName: true, price: true });
    return apiResponse(res, httpStatus.OK, { data: book });
})

const addBook = catchAsync(async (req, res, next) => {
    const { bookName, price, authorName } = req.body;
    const addNewBook = new BookModel({ bookName, price, authorName });
    await addNewBook.save();
    return apiResponse(res, httpStatus.CREATED, { data: addNewBook });
})

const updateBook = catchAsync(async (req, res, next) => {
    const { bookName, price, authorName } = req.body;
    console.log(bookName, price, authorName)
    const modify = await BookModel.updateOne({ _id: req.params._id }, { bookName, price, authorName });
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Information Updated" }, modify);
})

const deleteBook = catchAsync(async (req, res, next) => {
    const drop = await BookModel.deleteOne({ _id: req.params._id });
    return apiResponse(res, httpStatus.ACCEPTED, { message: "Information Deleted" }, drop);
})

module.exports = {
    getBooks,
    getBook,
    addBook,
    updateBook,
    deleteBook
}