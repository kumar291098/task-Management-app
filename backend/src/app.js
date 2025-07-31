// src/app.js - Main application file
// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Database connections
const { connectPostgreSQL } = require('./db/postgres');
const { connectMongoDB } = require('./db/mongodb');

// Models
const User = require('./models/userModel');

// Routes
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Task Management API is running',
    databases: {
      postgresql: 'Connected (Users)',
      mongodb: 'Connected (Tasks)'
    },
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;

// Initialize databases and start server
const startServer = async () => {
  try {
    console.log('🚀 Starting Task Management Server...\n');
    
    // Connect to PostgreSQL (Users)
    await connectPostgreSQL();
    
    // Connect to MongoDB (Tasks)
    await connectMongoDB();
    
    // Create default admin user
    await User.createDefaultAdmin();
    
    console.log('✅ Database initialization completed successfully.\n');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📊 API Health Check: http://localhost:${PORT}/api/health`);
      console.log(`👥 Users API (PostgreSQL): http://localhost:${PORT}/api/users`);
      console.log(`📋 Tasks API (MongoDB): http://localhost:${PORT}/api/tasks`);
      console.log('\n🎯 Ready to accept requests!');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();