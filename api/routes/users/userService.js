'use strict';

const { model: User } = require('./userModel');

// Create a new user and add to the database
exports.createUser = async (userData) => {
  // 1. Create a user instance
  const user = new User(userData);
  try {
    // 2. Make sure new user's email does not exist in db, as they have to be unique
    // I've commented this out because not only is it not working, it's breaking the sign-up function
    console.log(userData.email);
    const checkEmail = userData.email;
    const [checkUser] = await User.find({ checkEmail });
    if (!checkUser) {
      // 3. Save user to database
      const newUser = await user.save();
      // 4. return with created user
      return newUser;
    } else {
      const error = 'That email address is already in use! Please use another, or login.';
      return error;
    }
  } catch (e) {
    // 5. If error, throw and controller will catch
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
