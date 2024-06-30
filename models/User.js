const { object } = require("webidl-conversions");
const { dbConnection: database } = require("./../configs/db.js");
const { ObjectId } = require("bson");

// Find all users from database
const findUser = async () => {
    const db = await database();
    const usersCollection = db.collection("users");
    const users = usersCollection.find({}).toArray();

    return users;
};

// Check for if exist any user by email and username
const isExistUser = async (username, email) => {
    const db = await database();
    const usersCollection = db.collection("users");

    const filterUser = usersCollection.findOne({
        "login.email": { $eq: email },
        "login.username": { $eq: username },
    });

    return filterUser;
};

// Add new user into database
const insertUser = async (newUser) => {
    const db = await database();
    const usersCollection = db.collection("users");
    usersCollection.insertOne(newUser);
};

module.exports = {
    findUser,
    isExistUser,
    insertUser,
};
