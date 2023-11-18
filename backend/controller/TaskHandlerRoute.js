const expres = require("express");
const { createTask, editTask, deleteTask } = require("./TaskHandler")
const taskRoute = expres.Router();

taskRoute.post('/createTask', (req, res)=>{
    const result = createTask(req.body.email, req.body.taskname, req.body.date ,req.body.time, req.body.type ,req.body.description)
    if(result){
        res.status(200).send("Task created successfully");
    }
    else{
        res.status(500).send("Failed to create task");
    }
})                                                      //PRIORITY BHI ADD KRNA HAI
taskRoute.post('/updateTask', (req, res)=>{
    const result = editTask(req.body.email, req.body.tasknewname, req.body.taskoldname, req.body.date ,req.body.time, req.body.type ,req.body.description)
    if(result){
        res.status(200).send("Task update successfully");
    }
    else{
        res.status(500).send("Failed to update task");
    }
})
taskRoute.delete('/deleteTask', (req, res)=>{
    const result = deleteTask(req.body.email, req.body.taskname)
    if(result){
        res.status(200).send("Task delete successfully");
    }
    else{
        res.status(500).send("Failed to delete task");
    }
})

module.exports = taskRoute