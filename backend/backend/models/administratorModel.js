const mongoose = require('mongoose');

const administratorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'administrator' },
});

module.exports = mongoose.model('Administrator', administratorSchema);