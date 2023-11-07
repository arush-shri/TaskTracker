import DBConnection from'./DBConnector'
import { hasher } from './SignInUp'

async function changePassword(email, password){
    const passwd = hasher(password);
    const usersCollection = DBConnection.collection("users");
    const filter = { [email]: { $exists: true } };
    const updateQuery = {
        $set: {
            "email.password": passwd,
        }
    };
    const result = await usersCollection.updateOne(filter, updateQuery);
    if (result.modifiedCount === 1) {
        return "Password updated successfully";
    } else {
        return "There was an error while updating you password";
    }
}

async function changePhoneNumber(email, phoneNumber){
    const usersCollection = DBConnection.collection("users");
    const filter = { [email]: { $exists: true } };
    const updateQuery = {
        $set: {
            "email.phoneNumber": phoneNumber,
        }
    };
    const result = await usersCollection.updateOne(filter, updateQuery);
    if (result.modifiedCount === 1) {
        return "Phone number updated successfully";
    } else {
        return "There was an error while updating you phone number";
    }
}