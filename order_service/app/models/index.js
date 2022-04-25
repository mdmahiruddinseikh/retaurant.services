require("dotenv").config();

const Sequelize = require('sequelize');

const pg_con_string = process.env.POSTGRE_SQL_SERVER;

const fs = require("fs"); //fs module import

const path = require("path"); //path module import

console.log("SQL connection string : " + pg_con_string);
const sequelize = new Sequelize(pg_con_string);
let db = {};

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        // var model = sequelize.import(path.join(__dirname, file));

        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)

        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/* Define Relations */
db.items.belongsTo(db.orders, {
    as: 'order',
    foreignKey: {
        name: 'order_id'
    }
});

db.orders.hasMany(db.items, {
    as: 'items',
    foreignKey: {
        name: 'order_id',
    }
});

module.exports = db;
