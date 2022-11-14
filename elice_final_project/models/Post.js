const mongoose = require('mongoose')
const shortId = require('./types/short-id');

const postSchema = new mongoose.Schema({
    shortId,
    user_name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Post', postSchema)