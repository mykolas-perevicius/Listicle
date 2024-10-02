// server/routes/items.js

import express from 'express';
import { pool } from '../config/database.js';
import ItemsController from '../controllers/items.js';

const router = express.Router();

// Route to search items by title
router.get('/search', async (req, res) => {
  const { title } = req.query;
  try {
      const result = await pool.query('SELECT * FROM items WHERE title ILIKE $1', [`%${title}%`]);
      res.status(200).json(result.rows);
  } catch (error) {
      console.error('Error searching items:', error.message);
      res.status(500).json({ error: error.message });
  }
});

// Route to fetch all items
router.get('/', ItemsController.getItems);

// Route to fetch a single item by ID
router.get('/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
  
    try {
        const result = await pool.query('SELECT * FROM items WHERE id = $1', [itemId]);
  
        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        console.error('Error fetching item by ID:', error.message);
        res.status(500).json({ error: error.message });
    }
  });

export default router;
