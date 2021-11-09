const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Post extends Model {}

Post.init ({
    id: {
        type : DataTypes.INTEGER.UNSIGNED,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true,
        unique : true
    },
    creationDate: {
        type : DataTypes.DATE,
        allowNull : false
    },
    updateDate: {
        type : DataTypes.DATE,
        allowNull : false
    },
    title: {
        type : DataTypes.STRING,
        allowNull : false
    },
    description: {
        type : DataTypes.STRING,
        allowNull : false
    },
    URLimage: {
        type : DataTypes.STRING,
        allowNull : false
    }
}, {
    sequelize,
    modelName : 'Post', 
    timestamps: false // évite de rajouter à l'insert des timestamp
});

module.exports = Post;