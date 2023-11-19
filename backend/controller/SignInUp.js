
const { createHash } = require('crypto');
const { database, CloseConnection, openConnection } = require('./DBConnector');

function hasher(password) {
    return createHash('sha256').update(password).digest('hex');
}

async function initiateSignin(email, password){
    openConnection();
    const passwd = hasher(password);
    const usersDB = database.collection("users");
    const user = await usersDB.findOne({ "emailId": email });
    if(user){
        CloseConnection();
        return user.data.password  === passwd;
    }
    else{
        CloseConnection();
        return "User does not exist";
    }
    
}

async function initiateSignup(email, password, name, phoneNumber, age){
    openConnection();
    const passwd = hasher(password);
    const usersDB = database.collection("users");
    const user = await usersDB.findOne({ "emailId": email });
    if(user){
        return "User already exists"
    }
    else{
        const userData = {
            "emailId": email, 
            "data": {
                password: passwd,
                username: name,
                phoneNumber: phoneNumber,
                userAge: age 
            } 
        }
        try {
            const result = await usersDB.insertOne(userData);
            await database.collection("tasks").insertOne({"emailId" : email, "tasks" : []})
            CloseConnection();
            return true; // Indicates successful signup
        } catch (err) {
            console.log(err)
            CloseConnection();
            return err; // Indicates an error
        }
    }
}

module.exports = {initiateSignin, initiateSignup, hasher}