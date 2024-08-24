import NewsItem from '../NewsItem/NewsItem';
import styles from './NewsList.module.css';

const NewsList = ({ articles, favorites, isCategoryBased, onRemoveFavorite, isFavoritesPage }) => {
  return (
    <div className={styles.newsList}>
      {articles.map((article, index) => (
        <NewsItem
          key={index}
          article={article}
          isCategoryBased={isCategoryBased}
          favorites={favorites}
          onRemoveFavorite={onRemoveFavorite}
          isFavoritesPage={isFavoritesPage}
        />
      ))}
    </div>
  );
};

export default NewsList;
