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
    /* userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'User',
            key: 'idUser'
        }
    },
    postId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: 'Post',
            key: 'idPost'
        }
    }, */
    commentDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    commentText: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    /* userFirstName: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'User',
            key: 'firstName'
        }
    },
    userLastName: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'User',
            key: 'lastName'
        }
    } */
}, {
    sequelize,
    modelName: 'Comment',
    timestamps: false // évite de rajouter à l'insert des timestamp
});

module.exports = Comment;