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

// Post Hook to do something with the doc before it is save.
postSchema.post('validate', (doc, next) => {
    doc.short_content = doc.content.substr(0, 64) + '...';
    next();
});

// Export Our Post Model
module.exports = mongoose.model('Post', postSchema);