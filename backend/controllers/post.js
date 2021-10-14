const Post = require('../models/Post');
const User = require ('../models/User');
const fs = require('fs');

exports.getAllPosts= (req, res) => {
    Post.findAll()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            res.status(400).json({
                error: 'Pas fonctionné'
            });
        })
};