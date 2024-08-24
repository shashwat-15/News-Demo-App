import NewsService from '../services/newsService.js';

class NewsController {
  async fetchNews(req, res) {
    try {
      const { q, sources, pageSize, page } = req.query;
      const articles = await NewsService.fetchNews(q, sources, pageSize, page);
      res.json(articles);
    } catch (error) {
      console.error('Error fetching news:', error.message);
      res.status(500).json({ error: 'Failed to fetch news articles' });
    }
  }

  async fetchTopHeadlines(req, res) {
    try {
      const { category, pageSize, page } = req.query;
      const articles = await NewsService.fetchTopHeadlines(category, pageSize, page);
      res.json(articles);
    } catch (error) {
      console.error('Error fetching top headlines:', error.message);
      res.status(500).json({ error: 'Failed to fetch top headlines' });
    }
  }

  async fetchSources(req, res) {
    try {
      const sources = await NewsService.fetchSources();
      res.json(sources);
    } catch (error) {
      console.error('Error fetching sources:', error.message);
      res.status(500).json({ error: 'Failed to fetch sources' });
    }
  }

  async getFullContent(req, res) {
    try {
      const { url } = req.query;
      if (!url) {
        return res.status(400).json({ error: 'Missing article URL' });
      }

      const fullContent = await NewsService.fetchFullContent(url);
      res.json({ content: fullContent });
    } catch (error) {
      console.error('Error fetching full content:', error.message);
      res.status(500).json({ error: 'Failed to fetch full content' });
    }
  }
}

export default new NewsController();
