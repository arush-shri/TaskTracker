import DBConnection from'./DBConnector'
import { CloseConnection } from './DBConnector';
import { hasher } from './SignInUp'

async function changePassword(email, password){
    const passwd = hasher(password);
    const usersCollection = DBConnection.collection("users");
    const filter = { "emailId": email };
    const updateQuery = {
        $set: {
            "data.password": passwd,
        }
    };
    const result = await usersCollection.updateOne(filter, updateQuery);
    if (result.modifiedCount === 1) {
        CloseConnection()
        return "Password updated successfully";
    } else {
        CloseConnection()
        return "There was an error while updating you password";
    }
}

async function changePhoneNumber(email, phoneNumber){
    const usersCollection = DBConnection.collection("users");
    const filter = { "emailId": email };
    const updateQuery = {
        $set: {
            "data.phoneNumber": phoneNumber,
        }
    };
    const result = await usersCollection.updateOne(filter, updateQuery);
    if (result.modifiedCount === 1) {
        CloseConnection()
        return "Phone number updated successfully";
    } else {
        CloseConnection()
        return "There was an error while updating you phone number";
    }
}

module.exports = {changePassword, changePhoneNumber}