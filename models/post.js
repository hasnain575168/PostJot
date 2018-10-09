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

postSchema.post('validate', (err, doc) => {
    if(err) {
        throw err;
    }

    doc.short_content = content.substr(0, 128) + ' ...';
    doc.save();
});

module.exports = mongoose.model('Post', postSchema);