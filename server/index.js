import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import entryRoutes from './routes/entryRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/entries', entryRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', mode: app.locals.dbMode, timestamp: new Date().toISOString() });
});

// Try to connect to MongoDB, fall back to in-memory store
async function startServer() {
  let dbConnected = false;

  try {
    const mongoose = await import('mongoose');
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/burnout-tracker';
    await mongoose.default.connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
    console.log('✅ Connected to MongoDB');
    app.locals.dbMode = 'mongodb';
    dbConnected = true;
  } catch (error) {
    console.log('⚠️  MongoDB not available:', error.message);
    console.log('📦 Using in-memory storage (data will be lost on restart)');
    app.locals.dbMode = 'memory';
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    if (!dbConnected) {
      console.log('💡 To use persistent storage, install MongoDB: brew install mongodb-community');
    }
  });
}

startServer();
