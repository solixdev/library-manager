const { createServer } = require("http");
require("dotenv").config();

const hostname = process.env.HOST_NAME;
const port = process.env.PORT;

const server = createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("hello World");
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
