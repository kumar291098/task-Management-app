const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const taskSchema = new mongoose.Schema({
    taskId:{type:Number, unique:true},
    title: {type :String , required:true},
    description: String,
    status:{type:String, default:'pending'},
    priority:{type:String, default:'normal'},
    dueDate:Date
});
taskSchema.plugin(AutoIncrement, {inc_field: 'taskId', start_seq: 1});
module.exports=mongoose.model('Task', taskSchema);

