import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import dotenv from 'dotenv';

dotenv.config();

class NewsService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  mapArticles(articles) {
    return articles.map(article => ({
      title: article.title,
      source: article.source.name,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      content: article.content,
      description: article.description,
    }));
  }

  async fetchNews(query, sources = '', pageSize = 5, page = 1) {
    const params = {
      apiKey: this.apiKey,
      q: query,
      sources: sources,
      language: 'en',
      pageSize,
      page
    };
    try{
      const response = await axios.get('https://newsapi.org/v2/everything', { params });
      return {
        articles: this.mapArticles(response.data.articles),
        totalResults: response.data.totalResults,
      };
    } catch (error) {
      throw new Error('Failed to fetch news articles');
    }
  }

  async fetchTopHeadlines(category, pageSize = 5, page = 1) {
    const params = {
      apiKey: this.apiKey,
      category,
      language: 'en',
      pageSize,
      page,
    };
    if(category) params.category = category;
    else params.sources = 'bbc-news';
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', { params });
      return {
        articles: this.mapArticles(response.data.articles),
        totalResults: response.data.totalResults,
      };
    } catch (error) {
      throw new Error('Failed to fetch top headlines');
    }
  }

  async fetchSources() {
    const params = {
      apiKey: this.apiKey
    };
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines/sources', { params });
      return {
        sources: response.data.sources.map(source => ({
          id: source.id,
          name: source.name
        }))
      };
    } catch (error) {
      throw new Error('Failed to fetch sources');
    }
  }
  
  async fetchFullContent(articleUrl) {
    try {
      // Fetch the HTML content of the article
      const response = await axios.get(articleUrl);

      // Convert the HTML into a DOM object
      const dom = new JSDOM(response.data, {
        url: articleUrl,
      });

      // Use Readability to parse the article and extract the content
      const article = new Readability(dom.window.document).parse();

      return article.textContent.trim();
    } catch (error) {
      throw new Error('Failed to fetch full content');
    }
  }
}

export default new NewsService(process.env.NEWS_API_KEY);
