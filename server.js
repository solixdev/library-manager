const { createServer } = require("http");
require("dotenv").config();
const userController = require("./controllers/userController.js");

const hostname = process.env.HOST_NAME;
const port = process.env.PORT;

const server = createServer((req, res) => {
    if (req.method === "GET" && req.url === "/api/users") {
        userController.getAllUsers(req, res);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
