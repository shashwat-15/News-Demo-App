import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axiosInstance from '../../api/rootEndpoint';
import styles from './ArticleView.module.css';

const ArticleView = () => {
  const { articleUrl } = useParams();
  const location = useLocation();
  const [articleContent, setArticleContent] = useState('');
  const [loading, setLoading] = useState(true);

  // Access the article object passed via the state prop
  const article = location.state?.article;

  useEffect(() => {
    const fetchArticleDetails = async () => {
      try {
        const response = await axiosInstance.get('/news/full-content', {
          params: { url: articleUrl },
        });
        setArticleContent(response.data.content);
      } catch (error) {
        console.error('Error fetching article details:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetails();
  }, [articleUrl]);

  if (loading) {
    return <p className={styles.loading}>Loading article...</p>;
  }

  return (
    <div className={styles.articleContainer}>
      <h1 className={styles.title}>{article?.title}</h1>
      {article?.urlToImage && (
        <img src={article.urlToImage} alt="Article Image" className={styles.image} />
      )}
      <p className={styles.details}>
        <strong>Source:</strong> {article?.source} | <strong>Published:</strong> {new Date(article?.publishedAt).toLocaleDateString()}
      </p>
      <div className={styles.content}>
        <p>{articleContent}</p>
      </div>
      <a href={article?.url} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
        Read the full article on the original source
      </a>
    </div>
  );
};

export default ArticleView;
