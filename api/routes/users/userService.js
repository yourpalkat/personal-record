'use strict';

const User = require('./userModel');

// Helper function to list each of the users in the database
exports.listUsers = async () => {
  try {
    const users = User.find({});
    return users;
  } catch (e) {
    throw e;
  }
};

// Create a new user and add to the database
exports.createUser = async (userData) => {
  // 1. Create a user instance
  const user = new User(userData);
  try {
    // 2. Save user to database
    const doc = await user.save();
    // 3. return with created user
    return doc;
  } catch (e) {
    // 4. If error, throw and controller will catch
    throw e;
  }
};
