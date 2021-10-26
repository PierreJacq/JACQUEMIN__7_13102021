const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');
const sequelize = require('../config/database');

class Like extends Model {}

Like.init({
    user: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'User',
            key: 'idUser'
        }
    },
    post: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'Post',
            key: 'idPost'
        }
    }
}, {
    sequelize,
    modelName: 'Like',
    tableName: 'likes', // correspond à la table mySQL// 
    timestamps: false // évite de rajouter à l'insert des timestamp
});

module.exports = Like;