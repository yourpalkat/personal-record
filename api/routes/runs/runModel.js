'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Map to fields in the DB
const runSchema = new Schema({
  distance: {
    type: Number,
    required: true
  },
  elapsedTime: {
    type: Number,
    required: true
  },
  // date: {
  //   type: Date,
  //   required: true
  // },
  userId: {
    type: String,
    required: true
  },
  workoutType: {
    type: String,
    enum: ['Default', 'Easy', 'Hills', 'Tempo', 'Intervals'],
    required: true
  },
  notes: {
    type: String,
    maxlength: 500
  }
});

exports.model = mongoose.model('Run', runSchema, 'runs');