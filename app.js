const express = require("express"),
    bodyParser = require("body-parser");

const sequelize = require("./src/models");
const routes = require("./src/routes");

const app = express();

app.use(bodyParser.json());
app.use(routes);

(async () => {
    try {
        await sequelize.sync({ force: false });
    } catch (err) {
        console.log(err);
    }
})();

module.exports = app;