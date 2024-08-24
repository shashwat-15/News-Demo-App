import FavoriteService from '../services/favoriteService.js';

class FavoriteController {
  async addFavorite(req, res) {
    try {
      const user = req.user;
      const { article } = req.body;
      const favorite = await FavoriteService.addFavorite(user._id, article);
      res.status(201).json(favorite);
    } catch (error) {
      console.error('Error adding favorite:', error.message);
      res.status(500).json({ error: 'Failed to add favorite' });
    }
  }

  async getFavorites(req, res) {
    try {
      const user = req.user;
      const favorites = await FavoriteService.getFavorites(user._id);
      res.json(favorites);
    } catch (error) {
      console.error('Error fetching favorites:', error.message);
      res.status(500).json({ error: 'Failed to fetch favorites' });
    }
  }

  async removeFavorite(req, res) {
    try {
      const user = req.user;
      const { newsId } = req.params;
      await FavoriteService.removeFavorite(user._id, newsId);
      res.status(204).send();
    } catch (error) {
      console.error('Error removing favorite:', error.message);
      res.status(500).json({ error: 'Failed to remove favorite' });
    }
  }
}

export default new FavoriteController();
