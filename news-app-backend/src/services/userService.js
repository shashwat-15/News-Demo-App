import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

class UserService {
  async registerUser(username, email, password) {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    return newUser;
  }

  async loginUser(email, password) {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate a JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { token, username: user.username };
  }

  async logSearchQuery(userId, query) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    user.searchHistory.push({ query });
    await user.save();

    return user.searchHistory;
  }

  async getSearchHistory(userId) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    return user.searchHistory;
  }
}

export default new UserService();
