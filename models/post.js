const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    short_content: String,
    time: {
        type: Date,
        default: Date.now
    },
    author: String
});

postSchema.post('validate', (doc, next) => {
    doc.short_content = doc.content.substr(0, 64) + '...';
    next();
});

module.exports = mongoose.model('Post', postSchema);