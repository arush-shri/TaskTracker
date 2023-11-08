const { CloseConnection, database } = require('./DBConnector');

async function createTask(email, taskName, date, time, type, description){
    const tasksDB = database.collection("tasks");
    const filter = { "emailId": email };
    const taskQuery = {
        "taskname": taskName,
        "date": date,
        "time": time,
        "type": type,
        "description": [description]
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

async function editTask(email, taskNewName, taskOldName, date, time, type, description){
    const filter = { "emailId": email };
    const tasksDB = database.collection("tasks");
    const result =  await tasksDB.updateOne(filter, {$pull: {"taskname": taskOldName}});
    const updateResult = await createTask(email, taskNewName, date, time, type, description);
    if(result && updateResult){
        CloseConnection();
        return true;
    }
    else{
        CloseConnection();
        return "Unable to update task"
    }
}

async function deleteTask(email, taskName){
    const filter = { "emailId": email };
    const tasksDB = database.collection("tasks");
    const result =  await tasksDB.updateOne(filter, {$pull: {"taskname": taskName}});
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