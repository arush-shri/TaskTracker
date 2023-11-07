import { MongoClient } from "mongodb";

const { hashCreator } = require('crypto');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";       // TO CHANGE TO ORIGINAL URL
const client = new MongoClient(url);
const database = client.db("TaskTracker")

function hasher(password) {
    return hashCreator('sha256').update(password).digest('hex');
}

async function initiateSignin(email, password){
    const passwd = hasher(password);
    const usersDB = database.collection("users");
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
    const usersDB = database.collection("users");
    const user = await usersDB.findOne({ [email]: { $exists: true } });
    if(user){
        return "User already exists"
    }
    else{
        const userData = {
            [email]: {
                password: passwd,
                username: name,
                phoneNum: phoneNumber,
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