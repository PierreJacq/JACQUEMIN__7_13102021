const moment = require('moment');
const fs = require('fs');
const Post = require('../models/Post');
const User = require('../models/User');

exports.getAllPosts = (req, res) => {
    Post.findAll()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            res.status(500).json({
                error
            })
        })
};

exports.createPost = (req, res) => {
    User.findOne({
            where: {
                idUser: req.body.authorId
            }
        })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    error: "This user doesn't exist"
                })
            }
            Post.create({
                    authorId: user.idUser,
                    creationDate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                    updateDate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                    description: req.body.description,
                    URLimage: req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : `${req.protocol}://${req.get("host")}/images/pikachu.jpg`
                })
                .then((post) => {
                    res.status(200).json({
                        message: "Post created",
                        post
                    })
                })
                .catch((error) => {
                    res.status(404).json({
                        error: "Post not created",
                        error
                    })
                })
        })
        .catch((error) => {
            res.status(500).json({
                error
            })
        })
};

exports.getOnePost = (req, res) => {
    Post.findOne({
            where: {
                idPost: req.params.id
            }
        })
        .then((post) => {
            if (!post) {
                return res.status(404).json({
                    error: "This post doesn't exist"
                })
            }
            res.status(200).json(post)
        })
        .catch(() => {
            res.status(500).json({
                error: 'Internal server error'
            })
        });
}