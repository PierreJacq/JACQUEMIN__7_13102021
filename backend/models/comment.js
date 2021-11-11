const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');
const sequelize = require('../config/database');

class Comment extends Model {}

Comment.init({
    id: {
        type : DataTypes.INTEGER.UNSIGNED,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true,
        unique : true
    },    
    commentDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    commentText: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Comment',
    timestamps: false // évite de rajouter à l'insert des timestamp
});

module.exports = Comment;