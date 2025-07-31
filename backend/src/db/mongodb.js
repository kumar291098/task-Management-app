// src/db/mongodb.js - MongoDB connection
const mongoose = require('mongoose');

const connectMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/taskdb';
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connection established successfully.');
    return mongoose.connection;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
};

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('📊 MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('📊 MongoDB disconnected');
});

module.exports = { connectMongoDB, mongoose };