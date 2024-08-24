import express from 'express';
import FavoriteController from '../controllers/favoriteController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Favorites
 *   description: Manage favorite news articles
 */

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Add a news article to favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - article
 *             properties:
 *               article:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   source:
 *                     type: string
 *                   url:
 *                     type: string
 *                   urlToImage:
 *                     type: string
 *                   publishedAt:
 *                     type: string
 *                     format: date-time
 *                   content:
 *                     type: string
 *                   description:
 *                     type: string
 *     responses:
 *       201:
 *         description: Article added to favorites successfully
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Server error
 */
router.post('/favorites', authMiddleware, FavoriteController.addFavorite);

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Get all favorite news articles for the authenticated user
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of favorite news articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   source:
 *                     type: string
 *                   url:
 *                     type: string
 *                   urlToImage:
 *                     type: string
 *                   publishedAt:
 *                     type: string
 *                     format: date-time
 *                   content:
 *                     type: string
 *                   description:
 *                     type: string
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       500:
 *         description: Server error
 */
router.get('/favorites', authMiddleware, FavoriteController.getFavorites);

/**
 * @swagger
 * /api/favorites/{newsId}:
 *   delete:
 *     summary: Remove a news article from favorites
 *     tags: [Favorites]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: newsId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the news article to remove from favorites
 *     responses:
 *       200:
 *         description: Article removed from favorites successfully
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *       404:
 *         description: Favorite article not found
 *       500:
 *         description: Server error
 */
router.delete('/favorites/:newsId', authMiddleware, FavoriteController.removeFavorite);

export default router;
