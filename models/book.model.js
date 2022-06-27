const mongoose = require('mongoose');

const { Schema } = mongoose

const status = Object.freeze({
    available: 'available',
    not_available: 'not_available',
    removed: 'removed',
});

const bookSchema = new Schema({
    bookName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    authorName: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    }
}, { timestamps: true })

bookSchema.methods.toJSON = function () {
    let obj = this.toObject();

    delete obj.createdAt;
    delete obj.updatedAt;
    delete obj.__v;

    return obj;
};

const model = mongoose.model("bookcollections", bookSchema);
module.exports = { BookModel: model, BookStatus: status };