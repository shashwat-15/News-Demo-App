import { useState, useEffect } from 'react';
import axiosInstance from '../../api/rootEndpoint';
import NewsList from '../../components/News/NewsList/NewsList';
import styles from './FavoritePage.module.css';

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/favorites');
        setFavorites(response.data);
      } catch (error) {
        setError('Failed to load favorite articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      await axiosInstance.delete(`/favorites/${favoriteId}`);
      setFavorites(favorites.filter(favorite => favorite._id !== favoriteId)); // Remove the article from the list
    } catch (error) {
      console.error('Error removing favorite:', error);
      setError('Failed to remove favorite. Please try again later.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Your Favorite Articles</h2>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : favorites.length === 0 ? (
        <p className={styles.noFavorites}>You have no favorite articles.</p>
      ) : (
        <NewsList
          articles={favorites}
          favorites={favorites} // Pass the favorites list to handle icon state
          onRemoveFavorite={handleRemoveFavorite} // Pass the remove handler
          isFavoritesPage={true} // Indicate that this is the favorites page
        />
      )}
    </div>
  );
};

export default FavoritePage;
