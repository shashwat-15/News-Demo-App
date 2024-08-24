import NewsPage from '../NewsPage/NewsPage';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <NewsPage />
    </div>
  );
};

export default HomePage;