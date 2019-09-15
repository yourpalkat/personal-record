'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Map to fields in the DB
const bookSchema = new Schema({
    name: String,
    author: String,
    summary: String
});

module.exports = mongoose.model('Book', bookSchema);