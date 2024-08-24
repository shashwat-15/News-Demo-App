import { useState, useEffect } from 'react';
import SourceSelect from '../../components/SourceSelect/SourceSelect';
import axiosInstance from '../../api/rootEndpoint';
import NewsList from '../../components/News/NewsList/NewsList';
import CategoryBanner from '../../components/News/CategoryBanner/CategoryBanner';
import styles from './NewsPage.module.css';

const NewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [selectedSources, setSelectedSources] = useState([]);
  const [sourceOptions, setSourceOptions] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const isAuthenticated = !!localStorage.getItem('token');

  const defaultNews = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/news/top-headlines', {
        params: {
          page
        }
      });
      setArticles(response.data.articles);
      setTotalResults(response.data.totalResults);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/news/search', {
        params: {
          q: query,
          sources: selectedSources.map(source => source.value).join(','),
          pageSize: 5,
          page,
        },
      });
      setArticles(response.data.articles);
      setTotalResults(response.data.totalResults);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopHeadlines = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/news/top-headlines', {
        params: {
          category,
          pageSize: 5,
          page,
        },
      });
      setArticles(response.data.articles);
      setTotalResults(response.data.totalResults);
    } catch (error) {
      console.error('Error fetching top headlines:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await axiosInstance.get('/favorites');
      setFavorites(response.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const fetchSources = async () => {
    try {
      const response = await axiosInstance.get('/news/sources'); // Assume you have an endpoint that fetches the sources
      const sources = response.data.sources.map(source => ({
        value: source.id,
        label: source.name,
      }));
      setSourceOptions(sources);
    } catch (error) {
      console.error('Error fetching sources:', error);
    }
  };

  useEffect(() => {
    fetchSources(); // Fetch sources when component mounts
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites(); // Fetch the favorites only if the user is logged in
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (category) {
      fetchTopHeadlines();
    } else if (!query && selectedSources.length === 0) {
      defaultNews();
    } else if(query || selectedSources.length > 0){
      fetchNews();
    }
  }, [category, page]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setPage(1); // Reset to the first page on new search
    setCategory(''); // Clear the category when performing a keyword search
    
    // Log the search query to the backend
    if (isAuthenticated) {
      try {
        await axiosInstance.post('/users/search-history', { query });
      } catch (error) {
        console.error('Error logging search query:', error);
      }
    }

    fetchNews(); // Fetch news when search button is clicked
  };

  const handleCategorySelect = (category) => {
    setPage(1); // Reset to the first page on new category selection
    setQuery(''); // Clear the query when selecting a category
    setSelectedSources([]); // Clear the sources when selecting a category
    setCategory(category);
  };

  return (
    <div className={styles.container}>
      {/* <h2 className={styles.heading}>Latest News</h2> */}
      
      <CategoryBanner selectedCategory={category} onSelectCategory={handleCategorySelect} />

      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          placeholder="Search by keyword"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />

        <SourceSelect
          sourceOptions={sourceOptions}
          selectedSources={selectedSources}
          setSelectedSources={setSelectedSources}
        />

        <button type="submit" className={styles.button}>Search</button>
      </form>

      {loading ? (
        <p className={styles.loading}>Loading...</p>
      ) : articles.length === 0 ? (
        <p className={styles.noArticles}>No articles found</p>
      ) : (
        <>
          <NewsList
            articles={articles}
            favorites={favorites}
            isCategoryBased={!!category}
          />
          <div className={styles.pagination}>
            {page > 1 && <button onClick={() => setPage(page - 1)} className={styles.button}>Previous</button>}
            {page * 5 < totalResults && <button onClick={() => setPage(page + 1)} className={styles.button}>Next</button>}
          </div>
        </>
      )}
    </div>
  );
};

export default NewsPage;
