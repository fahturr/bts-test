const { Sequelize } = require("sequelize");
const { applyExtraSetup } = require("./extra-setup");

const option = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
};

const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    option
);

const models = [
    require("./model/checklist"),
    require("./model/listitem"),
    require("./model/user"),
];

for (const model of models) model(sequelize);

applyExtraSetup(sequelize);

module.exports = sequelize;