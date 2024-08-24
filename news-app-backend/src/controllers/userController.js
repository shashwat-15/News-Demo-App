import UserService from '../services/userService.js';

class UserController {
  async registerUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const newUser = await UserService.registerUser(username, email, password);
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error registering user:', error.message);
      res.status(500).json({ error: 'Failed to register user' });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const {token, username} = await UserService.loginUser(email, password);
      
      if (!token) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      res.json({ token, username });
    } catch (error) {
      console.error('Error logging in user:', error.message);
      res.status(500).json({ error: 'Failed to log in user' });
    }
  }

  async logSearchQuery(req, res) {
    try {
      const userId = req.user._id;
      const { query } = req.body;
      const history = await UserService.logSearchQuery(userId, query);
      res.status(201).json(history);
    } catch (error) {
      console.error('Error logging search query:', error.message);
      res.status(500).json({ error: 'Failed to log search query' });
    }
  }

  async getSearchHistory(req, res) {
    try {
      const userId = req.user._id;
      const history = await UserService.getSearchHistory(userId);
      res.json(history);
    } catch (error) {
      console.error('Error fetching search history:', error.message);
      res.status(500).json({ error: 'Failed to fetch search history' });
    }
  }
}

export default new UserController();
