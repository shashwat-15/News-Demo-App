import User from '../models/User.js';
import News from '../models/News.js';

class FavoriteService {
  async addFavorite(userId, article) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    let newsArticle = await News.findOne({ url: article.url });

    // If the article doesn't already exist in the News collection, create it
    if (!newsArticle) {
      newsArticle = new News(article);
      await newsArticle.save();
    }

    // Add the news article reference to the user's favorites if not already there
    if (!user.favorites.includes(newsArticle._id)) {
      user.favorites.push(newsArticle._id);
      await user.save();
    }

    return newsArticle;
  }

  async getFavorites(userId) {
    const user = await User.findById(userId).populate('favorites');
    if (!user) throw new Error('User not found');

    return user.favorites;
  }

  async removeFavorite(userId, newsId) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');

    const initialLength = user.favorites.length;
    user.favorites = user.favorites.filter(id => id.toString() !== newsId);
    if (user.favorites.length === initialLength) {
      throw new Error('Favorite not found');
    }
    
    await user.save();
  }
}

export default new FavoriteService();
