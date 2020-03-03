'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Map to fields in the DB
const runSchema = new Schema({
  distance: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  workoutType: {
    type: String,
    enum: ['Default', 'Easy', 'Recovery', 'Hills', 'Tempo', 'Intervals', 'Long', 'Race'],
    required: true
  },
  notes: {
    type: String,
    maxlength: 500
  },
  tempInC: Number,
  weather: {
    type: [String],
    enum: ['Sunny', 'Humid', 'Wind', 'Snow', 'Rain']
  },
  treadmill: {
    type: Boolean,
    default: false,
  },
  effort: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  completed: {
    type: Boolean,
    default: true,
  },
  racePosition: Number,
  raceFieldSize: Number,
  raceAgePosition: Number,
  raceAgeFieldSize: Number,
});

exports.model = mongoose.model('Run', runSchema, 'runs');