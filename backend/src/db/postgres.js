// src/db/postgres.js - PostgreSQL connection
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'task_management',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'root',
  logging: false, // Set to console.log to see SQL queries
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Test the connection
const connectPostgreSQL = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connection established successfully.');
    
    // Sync models
    await sequelize.sync({ force: false });
    console.log('✅ PostgreSQL models synchronized successfully.');
    
    return sequelize;
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error);
    throw error;
  }
};

module.exports = { sequelize, connectPostgreSQL };