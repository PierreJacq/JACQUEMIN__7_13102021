const sequelize = require('../config/database');
const User = require("./user");
const Post = require("./post");
const Comment = require("./comment");
const Like = require("./like");


User.hasMany(Post, { onDelete: "CASCADE" });
Post.belongsTo(User, { onDelete: "CASCADE" });

Post.hasMany(Comment, { onDelete: "CASCADE" });
Comment.belongsTo(Post, {onDelete: "CASCADE" });

User.hasMany(Comment , {onDelete: "CASCADE" });
Comment.belongsTo(User, {onDelete: "CASCADE" });

User.hasMany(Like, { onDelete: "CASCADE" });
Like.belongsTo(User, {onDelete: "CASCADE" });

Post.hasMany(Like, { onDelete: "CASCADE" });
Like.belongsTo(Post, {onDelete: "CASCADE" });

// ATTENTION CI-DESSOUS ON CASSE LA BASE

/* sequelize.sync({force : true})
    .then(() => {
        console.log("J'ai tout écrabouillé, inch allah'")
    })
    .catch(() => {
        console.log("lol non");
    }) 
 */

module.exports = { User, Post, Comment, Like}
