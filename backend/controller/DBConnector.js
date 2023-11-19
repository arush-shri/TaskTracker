
// var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";       // TO CHANGE TO ORIGINAL URL
const { MongoClient } = require('mongodb');
const client = new MongoClient(url);
const database = client.db("TaskTracker")

function openConnection(){client.connect()
    .then(()=>{
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });}

function CloseConnection(){
    client.close()
}

module.exports = {
    CloseConnection,
    openConnection,
    database
};