let tasks=[];
let id=1;
module.exports={
    getAll:()=>tasks,
    getById: (taskId)=> tasks.find(t=>t.id === Number(taskId)),
    create: (data)=>{
        const newTask={id:id++, ...data};
        tasks.push(newTask);
        return newTask;
    },
    update:(taskId, data)=>{
        const idx=tasks.findIndex(t=>t.id=== Number(taskId));
        if(idx === -1)return null;
        tasks[idx]={...tasks[idx], ...data};
        return tasks[idx];
    },
    remove:(taskId)=>{
        const idx=tasks.findIndex(t=>t.id===Number(taskId));
        if(idx === -1)return null;
        return tasks.splice(idx, 1)[0];
    }
};