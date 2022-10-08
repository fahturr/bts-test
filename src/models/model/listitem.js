const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Listitem", {
        _id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        itemName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isDone: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        tableName: "listitem",
        underscored: true
    });
};