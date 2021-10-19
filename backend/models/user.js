const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
    idUser: {
        type : DataTypes.INTEGER.UNSIGNED,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true,
        unique : true
    },
    login: {
        type: DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password: {
        type : DataTypes.STRING,
        allowNull : false
    },
    firstName: {
        type : DataTypes.STRING,
        allowNull : false
    },
    lastName: {
        type : DataTypes.STRING,
        allowNull : false
    },
    URLprofile: {
        type : DataTypes.STRING,
        allowNull : false
    },
    birthDate: {
        type : DataTypes.DATEONLY,
        allowNull : false
    },
    isAdmin: {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue: false
    }
}, {
    sequelize,
    modelName : 'User', 
    tableName: 'user', // correspond à la table mySQL// 
    timestamps: false // évite de rajouter à l'insert des timestamp
});

module.exports = User; 