const express= require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app=express();
app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);
const PORT=process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})