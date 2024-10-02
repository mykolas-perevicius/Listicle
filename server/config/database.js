import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

console.log('Database URL:', process.env.DATABASE_URL);
// Use DATABASE_URL from .env
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: false, // Disable SSL connection
});

export { pool };
