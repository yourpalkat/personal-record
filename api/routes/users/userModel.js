'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Map to fields in the DB
const userSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String
});

module.exports = mongoose.model('User', userSchema);