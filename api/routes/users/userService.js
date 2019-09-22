'use strict';

const { model: User } = require('./userModel');

// Create a new user and add to the database
exports.createUser = async (userData) => {
  // 1. Create a user instance
  const user = new User(userData);
  try {
    // 2. Save user to database
    const newUser = await user.save();
    // 3. return with created user
    return newUser;
  } catch (e) {
    // 4. If error, throw and controller will catch
    throw e;
  }
};

// Verify a user
exports.isUser = async ({ email, password }) => {
  try {
    const [user] = await User.find({ email });
    if (user) {
      const match = await user.comparePassword(password);
      if (match) {
        return user;
      }
    }
  } catch (e) {
    throw e;
  }
}
