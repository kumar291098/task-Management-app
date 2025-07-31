// src/models/taskModel.js - MongoDB task schema
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const taskSchema = new mongoose.Schema({
  taskId: { 
    type: Number, 
    unique: true 
  },
  title: { 
    type: String, 
    required: true,
    trim: true,
    maxlength: 200
  },
  description: { 
    type: String,
    trim: true,
    maxlength: 1000
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  priority: { 
    type: String, 
    enum: ['low', 'normal', 'high'],
    default: 'normal'
  },
  dueDate: { 
    type: Date, 
    required: true
  },
  userId: { 
    type: Number, 
    required: true,
    ref: 'User' // Reference to PostgreSQL User ID
  },
  assignedBy: { 
    type: Number,
    ref: 'User' // Reference to PostgreSQL User ID
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Auto-increment taskId
taskSchema.plugin(AutoIncrement, { inc_field: 'taskId', start_seq: 1 });

// Update the updatedAt field before saving
taskSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Update the updatedAt field before updating
taskSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// Instance method to populate user data (since we're using cross-database references)
taskSchema.methods.populateUserData = async function() {
  // This would need to be handled in the controller by fetching user data from PostgreSQL
  return this;
};

// Static method to get tasks with user data
taskSchema.statics.getTasksWithUsers = async function(filter = {}) {
  return await this.find(filter).sort({ createdAt: -1 });
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;