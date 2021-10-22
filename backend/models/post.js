const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Post extends Model {}

Post.init ({
    idPost: {
        type : DataTypes.INTEGER.UNSIGNED,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true,
        unique : true
    },
    authorId: {
        type: DataTypes.INTEGER.UNSIGNED,
        references : {
            model: 'User',
            key: 'idUser'
        }
    },
    creationDate: {
        type : DataTypes.DATE,
        allowNull : false
    },
    updateDate: {
        type : DataTypes.DATE,
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
    tableName: 'post', // correspond à la table mySQL// 
    timestamps: false // évite de rajouter à l'insert des timestamp
});

module.exports = Post;