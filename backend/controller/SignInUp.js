
const { createHash } = require('crypto');
const { CloseConnection, database } = require('./DBConnector');

function hasher(password) {
    return createHash('sha256').update(password).digest('hex');
}

async function initiateSignin(email, password){
    const passwd = hasher(password);
    const usersDB = database.collection("users");
    const user = await usersDB.findOne({ "emailId": email });
    if(user){
        CloseConnection()
        console.log(passwd)
        return user.data.password  === passwd;
    }
    else{
        CloseConnection()
        console.log("User does not exist")
        return "User does not exist";
    }
}

async function initiateSignup(email, password, name, phoneNumber, age){
    const passwd = hasher(password);
    const usersDB = database.collection("users");
    const user = await usersDB.findOne({ "emailId": email });
    if(user){
        console.log("User already exists")
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
            console.log("true")
            database.collection("tasks").insertOne({"emailId" : email, "tasks" : []})
            return true; // Indicates successful signup
        } catch (err) {
            console.log(err)
            return err; // Indicates an error
        }
    }
}

module.exports = {initiateSignin, initiateSignup, hasher}