"use strict";
require("dotenv").config();
const app = require("./app"),
    http = require("http");

const _port = process.env.APP_PORT || 5555;
const server = http.createServer(app);

server.listen(_port, (err) => {
    if (err) throw err;
    console.log(`Server running at localhost:${_port}`);
});