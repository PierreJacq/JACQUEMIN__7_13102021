const {
    Sequelize,
    DataTypes,
    Model
} = require('sequelize');
const sequelize = require('../config/database');

class Like extends Model {}

Like.init({}, {
    sequelize,
    modelName: 'Like',
    timestamps: false // évite de rajouter à l'insert des timestamp
});

module.exports = Like;