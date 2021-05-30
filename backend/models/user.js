const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    googleID: String
});

mongoose.model('users', UserSchema);