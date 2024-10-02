// server/server.js

import express from 'express';
import itemsRouter from './routes/items.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

import './config/dotenv.js';

// Enable CORS for your frontend domain
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Serve backend static assets if any (optional)
app.use('/public', express.static(path.join(__dirname, '../client/public')));
app.use('/scripts', express.static(path.join(__dirname, '../client/public/scripts')));

app.get('/test', (req, res) => {
  res.status(200).json({ message: "API is working!" });
});

// Use the items router for API endpoints
app.use('/api/items', itemsRouter);

// Simple welcome route
app.get('/', (req, res) => {
  res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Listicle API</h1>');
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).send('Route not found');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
