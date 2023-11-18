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

async function getTask(email, taskName) {
    const filter = {"emailId": email, "taskname": taskName};
    const tasksDB = database.collection("tasks");
    
    try {
        const result = await tasksDB.findOne(filter);

        if (result) {
            CloseConnection();
            return result;
        } else {
            CloseConnection();
            return "Task not found";
        }
    } catch (error) {
        console.error("Error fetching task:", error);
        CloseConnection();
        return "Error fetching task";
    }
}

async function getAllTasks(email) {
    const filter = { "emailId": email };
    const taskDB = database.collection("tasks");
    
    try {
        const result = await taskDB.find(filter).toArray();

        if (result.length > 0) {
            CloseConnection();
            return result;
        } else {
            CloseConnection();
            return "No tasks found for the user";
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
        CloseConnection();
        return "Error fetching tasks";
    }
}


module.exports = { createTask, editTask, deleteTask, getTask, getAllTasks }