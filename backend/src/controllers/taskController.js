const Task=require('../models/task');

exports.getTasks=(req, res)=>{
    res.json(Task.getAll());
};

exports.getTask=(req, res)=>{
    const task=Task.getById(req.params.id);
    if(!task)return res.status(404).json({message: 'Task not found'});
    res.json(task);
};

exports.createTask=(req, res)=>{
    const newTask = Task.create(req.body);
    res.status(201).json(newTask);
};
exports.updateTask=(req, res)=>{
    const updateTask=Task.update(req.params.id, req.body);
    if(!updateTask)return res.ststus(404).json({message:"Task not found"});
    res.json(updatedTask);
};
exports.deleteTask=(req, res)=>{
    const deleted=Task.remove(req.params.id);
    if(!deleted)return res.status(404).json({message:"Task not found"});
    res.json({message:"Task deleted successfully", task: deleted});
};