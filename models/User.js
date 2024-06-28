const { DataTypes } = require('sequelize');
const sequelize = require('../sq'); // Adjust path as per your file structure

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    authenticated: {
        type: DataTypes.BOOLEAN,

    }
});

module.exports = User;
