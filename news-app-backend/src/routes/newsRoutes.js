import express from 'express';
import NewsController from '../controllers/newsController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: News
 *   description: News management and retrieval
 */

/**
 * @swagger
 * /api/news/search:
 *   get:
 *     summary: Search for news articles based on a query or source
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: false
 *         description: The keyword or phrase to search for
 *       - in: query
 *         name: sources
 *         schema:
 *           type: string
 *         required: false
 *         description: A comma-separated string of identifiers for the news sources
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 5
 *         required: false
 *         description: The number of results to return per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: The page number to return
 *     responses:
 *       200:
 *         description: A list of news articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       source:
 *                         type: string
 *                       url:
 *                         type: string
 *                       urlToImage:
 *                         type: string
 *                       publishedAt:
 *                         type: string
 *                         format: date-time
 *                       content:
 *                         type: string
 *                       description:
 *                         type: string
 *                 totalResults:
 *                   type: integer
 *       500:
 *         description: Server error
 */
router.get('/search', NewsController.fetchNews);

/**
 * @swagger
 * /api/news/top-headlines:
 *   get:
 *     summary: Fetch top headlines based on category or country
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         required: false
 *         description: The category to fetch headlines for
 *       - in: query
 *         name: sources
 *         schema:
 *           type: string
 *         required: false
 *         description: A comma-separated string of identifiers for the news sources
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         required: false
 *         description: The country code to fetch headlines for
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 5
 *         required: false
 *         description: The number of results to return per page
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: The page number to return
 *     responses:
 *       200:
 *         description: A list of top headline articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articles:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       source:
 *                         type: string
 *                       url:
 *                         type: string
 *                       urlToImage:
 *                         type: string
 *                       publishedAt:
 *                         type: string
 *                         format: date-time
 *                       content:
 *                         type: string
 *                       description:
 *                         type: string
 *                 totalResults:
 *                   type: integer
 *       500:
 *         description: Server error
 */
router.get('/top-headlines', NewsController.fetchTopHeadlines);

/**
 * @swagger
 * /api/news/sources:
 *   get:
 *     summary: Fetch all available news sources
 *     tags: [News]
 *     responses:
 *       200:
 *         description: A list of news sources
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sources:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       url:
 *                         type: string
 *                       category:
 *                         type: string
 *                       language:
 *                         type: string
 *                       country:
 *                         type: string
 *       500:
 *         description: Server error
 */
router.get('/sources', NewsController.fetchSources);

/**
 * @swagger
 * /api/news/full-content:
 *   get:
 *     summary: Fetch full content of a news article
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: url
 *         schema:
 *           type: string
 *         required: true
 *         description: The URL of the article to fetch full content for
 *     responses:
 *       200:
 *         description: Full content of the news article
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 content:
 *                   type: string
 *                 urlToImage:
 *                   type: string
 *       400:
 *         description: Bad request - Invalid URL
 *       500:
 *         description: Server error
 */
router.get('/full-content', NewsController.getFullContent);

export default router;
