import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axiosInstance from '../../../api/rootEndpoint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import styles from './NewsItem.module.css';

const NewsItem = ({ article, favorites, isCategoryBased, onRemoveFavorite, isFavoritesPage }) => {
  const location = useLocation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);

  useEffect(() => {
    const favoriteArticle = favorites.find(favorite => favorite.url === article.url);
    if (favoriteArticle) {
      setIsFavorite(true);
      setFavoriteId(favoriteArticle._id);
    } else {
      setIsFavorite(false);
      setFavoriteId(null);
    }
  }, [favorites, article.url]);

  const isAuthenticated = !!localStorage.getItem('token');

  const handleFavoriteClick = async () => {
    if (isFavoritesPage && isFavorite) {
      onRemoveFavorite(favoriteId); // Call the remove handler if on favorites page
    } else if (isAuthenticated && !isFavorite) {
      try {
        const response = await axiosInstance.post('/favorites', { article });
        setIsFavorite(true);
        setFavoriteId(response.data._id);
      } catch (error) {
        console.error('Error adding to favorites:', error);
      }
    }
  };

  return (
    <div className={styles.newsItem}>
      <h3 className={styles.title}>{article.title}</h3>
      <p className={styles.details}>
        <strong>Source:</strong> {article.source} | <strong>Published:</strong> {new Date(article.publishedAt).toLocaleDateString()}
      </p>
      <p className={styles.description}>{article.description}</p>
      
      {/* Favorite Icon */}
      {isAuthenticated && (
        <div className={styles.favoriteIcon} onClick={handleFavoriteClick}>
          <FontAwesomeIcon 
            icon={isFavorite ? solidHeart : regularHeart}
          />
        </div>
      )}

      {isCategoryBased ? (
        <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.readMore}>
          Read more
        </a>
      ) : (
        <Link
          to={`/article/${encodeURIComponent(article.url)}`}
          state={{
            article: article,
            from: location.pathname
          }}
          className={styles.readMore}
        >
          Read more
        </Link>
      )}
    </div>
  );
};

export default NewsItem;
