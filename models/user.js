const mongoose                  = require('mongoose'),
      passportLocalMongoose     = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

// We plugin passport local mongoose which gives us methods
// like (de)serializefield and local strategy setup
userSchema.plugin(passportLocalMongoose);

// Export Our User Model
module.exports = mongoose.model('User', userSchema);