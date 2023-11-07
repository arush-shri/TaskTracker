import { MongoClient } from "mongodb";

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";       // TO CHANGE TO ORIGINAL URL
const client = new MongoClient(url);
export default database = client.db("TaskTracker")