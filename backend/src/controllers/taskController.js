// src/controllers/taskController.js
const Task = require('../models/taskModel');
const User = require('../models/userModel');

// Helper function to get user data from PostgreSQL
const getUserData = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: ['id', 'username', 'firstName', 'lastName', 'email']
    });
    return user ? user.toJSON() : null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

// Helper function to attach user data to tasks
const attachUserDataToTasks = async (tasks) => {
  const tasksWithUsers = await Promise.all(
    tasks.map(async (task) => {
      const taskObj = task.toObject();
      
      // Get assigned user data
      if (taskObj.userId) {
        taskObj.assignedUser = await getUserData(taskObj.userId);
      }
      
      // Get assigned by user data
      if (taskObj.assignedBy) {
        taskObj.assignedByUser = await getUserData(taskObj.assignedBy);
      }
      
      return taskObj;
    })
  );
  
  return tasksWithUsers;
};

// Get all tasks or tasks by userId
exports.getTasks = async (req, res) => {
  try {
    console.log('📋 Get tasks request, query:', req.query);
    const { userId } = req.query;
    let filter = {};
    
    // If specific user requested
    if (userId) {
      filter.userId = parseInt(userId);
    }
    
    // If not admin, only show own tasks
    if (req.userRole !== 'admin' && req.userId) {
      filter.userId = req.userId;
    }

    console.log('🔍 Task filter:', filter);
    const tasks = await Task.getTasksWithUsers(filter);
    
    // Attach user data from PostgreSQL
    const tasksWithUsers = await attachUserDataToTasks(tasks);
    
    console.log(`📊 Found ${tasksWithUsers.length} tasks`);
    res.json(tasksWithUsers);
  } catch (err) {
    console.error('❌ Get tasks error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get task by ID
exports.getTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    console.log('🔍 Get task by ID:', taskId);
    
    let filter = { taskId: parseInt(taskId) };
    
    // If not admin, only allow access to own tasks
    if (req.userRole !== 'admin' && req.userId) {
      filter.userId = req.userId;
    }

    const task = await Task.findOne(filter);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Attach user data
    const tasksWithUsers = await attachUserDataToTasks([task]);
    
    res.json(tasksWithUsers[0]);
  } catch (err) {
    console.error('❌ Get task error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Create task
exports.createTask = async (req, res) => {
  try {
    console.log('➕ Create task request:', req.body);
    const { title, description, status, priority, dueDate, userId } = req.body;
    
    // Determine who the task is assigned to
    let assignedUserId = userId || req.userId;
    
    // If admin is creating task for someone else
    if (req.userRole === 'admin' && userId) {
      assignedUserId = parseInt(userId);
    }
    
    // Verify the assigned user exists in PostgreSQL
    const assignedUser = await getUserData(assignedUserId);
    if (!assignedUser) {
      return res.status(400).json({ error: 'Assigned user not found' });
    }

    const newTask = await Task.create({
      title,
      description,
      status: status || 'pending',
      priority: priority || 'normal',
      dueDate,
      userId: assignedUserId,
      assignedBy: req.userId
    });

    console.log('✅ Task created:', newTask.taskId);

    // Attach user data to response
    const tasksWithUsers = await attachUserDataToTasks([newTask]);
    
    res.status(201).json(tasksWithUsers[0]);
  } catch (err) {
    console.error('❌ Create task error:', err);
    res.status(400).json({ error: err.message });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;
    
    console.log('📝 Update task:', taskId, updates);
    
    let filter = { taskId: parseInt(taskId) };
    
    // If not admin, only allow updating own tasks
    if (req.userRole !== 'admin' && req.userId) {
      filter.userId = req.userId;
    }

    const task = await Task.findOneAndUpdate(filter, updates, { new: true });
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    console.log('✅ Task updated:', task.taskId);

    // Attach user data to response
    const tasksWithUsers = await attachUserDataToTasks([task]);
    
    res.json(tasksWithUsers[0]);
  } catch (err) {
    console.error('❌ Update task error:', err);
    res.status(400).json({ error: err.message });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    console.log('🗑️ Delete task:', taskId);
    
    let filter = { taskId: parseInt(taskId) };
    
    // If not admin, only allow deleting own tasks
    if (req.userRole !== 'admin' && req.userId) {
      filter.userId = req.userId;
    }

    const task = await Task.findOneAndDelete(filter);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    console.log('✅ Task deleted:', taskId);
    
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error('❌ Delete task error:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get task statistics
exports.getTaskStats = async (req, res) => {
  try {
    let filter = {};
    
    // If not admin, only show own task stats
    if (req.userRole !== 'admin' && req.userId) {
      filter.userId = req.userId;
    }

    const stats = await Task.aggregate([
      { $match: filter },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json(stats);
  } catch (err) {
    console.error('❌ Get stats error:', err);
    res.status(500).json({ error: err.message });
  }
};