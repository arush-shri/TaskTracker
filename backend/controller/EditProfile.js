const { database, CloseConnection, openConnection } = require('./DBConnector');

async function changePassword(email, password){
    openConnection();
    const passwd = hasher(password);
    const usersCollection = database.collection("users");
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
    openConnection();
    const usersCollection = database.collection("users");
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

async function getMe(email) {
    openConnection();
    const usersCollection = database.collection("users");
    const filter = { "emailId": email };

    try {
        const user = await usersCollection.findOne(filter);

        if (user) {
            const userDetails = user.data;
            CloseConnection();
            return userDetails;
        } else {
            CloseConnection();
            return "User not found";
        }
    } catch (error) {
        console.error("Error fetching user details:", error);
        CloseConnection();
        return "Error fetching user details";
    }
}

module.exports = { changePassword, changePhoneNumber, getMe };
