import { pool } from '../config/database.js';

const getItems = async (req, res) => {
    const { search } = req.query;

    try {
        let query = 'SELECT * FROM items';
        let params = [];

        // If search term is provided, add a WHERE clause
        if (search) {
            query += ' WHERE title ILIKE $1 OR category ILIKE $1';
            params.push(`%${search}%`);
        }

        query += ' ORDER BY id ASC';

        const result = await pool.query(query, params);

        // Debugging: Log the result from the database
        console.log('Database result:', result.rows);

        res.status(200).json(result.rows);
    } catch (error) {
        // Debugging: Log the error message
        console.error('Error querying database:', error.message);
        res.status(500).json({ error: error.message });
    }
};


export default {
    getItems
};
