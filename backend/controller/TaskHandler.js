const { CloseConnection, openConnection, database } = require('./DBConnector');

async function createTask(email, taskName, deadline, description, status){
    openConnection();
    const receivedDeadline = new Date(deadline);
    const year = receivedDeadline.getFullYear();
    const month = receivedDeadline.getMonth() + 1;
    const day = receivedDeadline.getDate();
    const hours = receivedDeadline.getHours();
    const minutes = receivedDeadline.getMinutes();
    const seconds = receivedDeadline.getSeconds();

    const date = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    const time = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    const tasksDB = database.collection("tasks");
    const filter = { "emailId": email };
    const taskQuery = {
        "taskname": taskName,
        "date": date,
        "time": time,
        "description": description,
        "status": status                       //PRIORITY BHI ADD KRNA HAI
    };
    const result = await tasksDB.updateOne(filter, {$push: {"tasks" : taskQuery}});

    if(result.modifiedCount === 1){
        CloseConnection();
        return true;
    }
    else{
         ;
        return result;
    }
}

async function editTask(email, taskName, Olddeadline, Newdeadline , description, status){
    openConnection();
    const receivedDeadline = new Date(Olddeadline);
    const year = receivedDeadline.getFullYear();
    const month = receivedDeadline.getMonth() + 1;
    const day = receivedDeadline.getDate();
    const hours = receivedDeadline.getHours();
    const minutes = receivedDeadline.getMinutes();
    const seconds = receivedDeadline.getSeconds();

    const olddate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    const oldtime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;


    const filter = { "emailId": email };
    const tasksDB = database.collection("tasks");
    const result =  await tasksDB.updateOne(filter, {$pull: {"taskname": taskName, "date": olddate, "time": oldtime}});
    const updateResult = await createTask(email, taskName, Newdeadline, description, status);
    if(result && updateResult){
        ;
        return true;
    }
    else{
        CloseConnection();
        return "Unable to update task"
    }
}

async function deleteTask(email, taskName, deadline){
    openConnection();
    const receivedDeadline = new Date(deadline);
    const year = receivedDeadline.getFullYear();
    const month = receivedDeadline.getMonth() + 1;
    const day = receivedDeadline.getDate();
    const hours = receivedDeadline.getHours();
    const minutes = receivedDeadline.getMinutes();
    const seconds = receivedDeadline.getSeconds();

    const date = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    const time = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

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
    openConnection();
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
    openConnection();
    const filter = { "emailId": email };
    const taskDB = database.collection("tasks");
    
    try {
        const result = await taskDB.findOne(filter)
        if (result.tasks.length > 0) {
            CloseConnection();
            return result.tasks;
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