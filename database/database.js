const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(process.env.DATABASE, process.env.USER_DATABASE, process.env.PASSWROD_DATABASE, {
    host: process.env.HOST_DATABASE,
    dialect: process.env.DIALECT
})