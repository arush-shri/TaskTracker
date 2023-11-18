const { CloseConnection, database } = require('./DBConnector');

async function createTask(email, taskName, date, time, type, priority, description){
    const tasksDB = database.collection("tasks");
    const filter = { "emailId": email };
    const taskQuery = {
        "taskname": taskName,
        "date": date,
        "time": time,
        "type": type,
        "priority": priority,
        "description": [description]                         //PRIORITY BHI ADD KRNA HAI
    };
    const result = await tasksDB.updateOne(filter, {$push: {"tasks" : taskQuery}});

    if(result.modifiedCount === 1){
        CloseConnection();
        return true;
    }
    else{
        CloseConnection();
        return result;
    }
}
                         //PRIORITY BHI ADD KRNA HAI
async function editTask(email, taskName, date, time, type, priority, description){
    const filter = { "emailId": email };
    const tasksDB = database.collection("tasks");
    const result =  await tasksDB.updateOne(filter, {$pull: {"taskname": taskName, "date": date, "time": time}});
    const updateResult = await createTask(email, taskName, date, time, type, priority, description);
    if(result && updateResult){
        CloseConnection();
        return true;
    }
    else{
        CloseConnection();
        return "Unable to update task"
    }
}

async function deleteTask(email, taskName, date, time){
    const filter = { "emailId": email };
    const tasksDB = database.collection("tasks");
    const result =  await tasksDB.updateOne(filter, {$pull: {"taskname": taskName, "date": date, "time": time}});
    if(result){
        CloseConnection();
        return true;
    }
    else{
        CloseConnection();
        return "Unable to update task";
    }
}

module.exports = { createTask, editTask, deleteTask }