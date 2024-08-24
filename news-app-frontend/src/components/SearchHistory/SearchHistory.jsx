import { useState, useEffect } from 'react';
import axiosInstance from '../../api/rootEndpoint';
import styles from './SearchHistory.module.css';

const SearchHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSearchHistory = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/users/search-history');
        setHistory(response.data);
      } catch (error) {
        setError('Failed to load search history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchHistory();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Your Search History</h2>
      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : error ? (
        <p className={styles.error}>{error}</p>
      ) : history.length === 0 ? (
        <p className={styles.noHistory}>You have no search history.</p>
      ) : (
        <ul className={styles.historyList}>
          {history.map((item, index) => (
            <li key={index} className={styles.historyItem}>{item.query}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchHistory;
