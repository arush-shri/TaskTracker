import DBConnection from'./DBConnector'

const { hashCreator } = require('crypto');
export function hasher(password) {
    return hashCreator('sha256').update(password).digest('hex');
}

async function initiateSignin(email, password){
    const passwd = hasher(password);
    const usersDB = DBConnection.collection("users");
    const user = await usersDB.findOne({ [email]: { $exists: true } });
    if(user){
        return user[email].password === passwd;
    }
    else{
        return "User does not exist";
    }
}

async function initiateSignup(email, password, name, phoneNumber, age){
    const passwd = hasher(password);
    const usersDB = DBConnection.collection("users");
    const user = await usersDB.findOne({ [email]: { $exists: true } });
    if(user){
        return "User already exists"
    }
    else{
        const userData = {
            [email]: {
                password: passwd,
                username: name,
                phoneNumber: phoneNumber,
                userAge: age 
            } 
        }
        try {
            const result = await usersDB.insertOne(userData);
            return true; // Indicates successful signup
        } catch (err) {
            return err; // Indicates an error
        }
    }
}