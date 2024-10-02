import { pool } from './database.js';
import './dotenv.js';
import itemData from '../data/items.js';

const createItemsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS items;
        CREATE TABLE IF NOT EXISTS items (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            category VARCHAR(255),
            submittedBy VARCHAR(255),
            submittedOn TIMESTAMP
        )
    `;
    try {
        await pool.query(createTableQuery);
        console.log('🎉 items table created successfully');
    } catch (err) {
        console.error('⚠️ error creating items table', err);
    }
};

const seedItemsTable = async () => {
    await createItemsTable();
    itemData.forEach((item) => {
        const insertQuery = {
            text: 'INSERT INTO items (title, image, description, category, submittedBy, submittedOn) VALUES ($1, $2, $3, $4, $5, $6)',
            values: [
                item.title,
                item.image,
                item.description,
                item.category,
                item.submittedBy,
                item.submittedOn
            ],
        };
        pool.query(insertQuery.text, insertQuery.values, (err) => {
            if (err) {
                console.error('⚠️ error inserting item', err);
            } else {
                console.log(`✅ ${item.title} added successfully`);
            }
        });
    });
};

seedItemsTable();
