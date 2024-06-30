const url = require("url");
const { dbConnection: database } = require("./../configs/db.js");
const UserModel = require("./../models/User.js");

// Get all users information from database
const getAllUsers = async (request, response) => {
    const users = await UserModel.findUser();
    let responseMessage = JSON.stringify(users);
    await setResponse(response, 200, responseMessage);
};

// Insert a new user into database
const insertUser = async (request, response) => {
    let user = "";

    request.on("data", (data) => {
        user = user + data.toString();
    });

    request.on("end", async () => {
        const requestBody = JSON.parse(user);

        const filteredUser = await UserModel.isExistUser(
            requestBody.login.username,
            requestBody.login.email
        );

        if (
            requestBody.login.username === "" ||
            requestBody.login.password === "" ||
            requestBody.login.email === ""
        ) {
            const responseMessage = JSON.stringify({
                message: "Please enter a valid data",
            });
            await setResponse(response, 400, responseMessage);
        } else if (filteredUser) {
            const responseMessage = JSON.stringify({
                message:
                    "The user is already exist with this username or email !",
            });
            await setResponse(response, 400, responseMessage);
        } else {
            const newUser = {
                gender: requestBody.gender,
                name: {
                    first: requestBody.name.first,
                    last: requestBody.name.last,
                    title: requestBody.name.title,
                },
                login: {
                    username: requestBody.login.username,
                    password: requestBody.login.password,
                    email: requestBody.login.email,
                    type: "USER",
                },
                crime: 0,
                borrowedHistory: [],
                borrowCount: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            };

            await UserModel.insertUser(newUser);

            const responseMessage = JSON.stringify({
                message: "New user successfully added",
            });
            await setResponse(response, 200, responseMessage);
        }
    });
};

// A function for set response for every action
async function setResponse(response, statusCode, message) {
    response.statusCode = statusCode;
    response.setHeader("Content-Type", "application/json");
    response.end(message);
}

module.exports = {
    getAllUsers,
    insertUser,
};
