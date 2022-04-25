require("dotenv").config();
const app = require('./app/index')
const http = require("http");

var model = require('./app/models');

//express application
const server = http.createServer(app)

console.log("Syncing database...");
model.sequelize.sync({
    // logging: console.log,
    logging: false,
    alter: true,
}).then(function () {
    const IP_ADDRESS = process.env.IP_ADDRESS || "0.0.0.0";
    const PORT = +process.env.PORT || 8082;

    console.log("IP ADDR", IP_ADDRESS, "Port ", PORT);

    server.listen(PORT, IP_ADDRESS, function (err) {
        if (err)
            console.error("Could not listen ", err);
        return;
    });

    console.log("Working on port  ", PORT);
});

module.exports = server
