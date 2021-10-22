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
        .catch((error) => {
            res.status(500).json({
                error: 'Internal server error',
                error
            })
        });
};

exports.modifyPost = (req, res) => {
    const postObject = req.file ? {
        ...req.body,
        URLimage: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : {
        ...req.body
    };
    Post.findOne({
            where: {
                idPost: req.params.id
            }
        })
        .then((foundPost) => {
            if (!foundPost) {
                return res.status(404).json({
                    error: "This post doesn't exist"
                })
            }
            foundPost.update({
                    updateDate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                    description: postObject.description,
                    URLimage: postObject.URLimage
                })
                .then((updatedPost) => {
                    res.status(200).json({
                        updatedPost,
                        message: 'This post has been updated'
                    })
                })
                .catch((error) => {
                    res.status(400).json({
                        error,
                        error: 'Could not update post'
                    })
                })
        })
        .catch((error) => {
            res.status(500).json({
                error: 'Internal server error',
                error
            })
        })
}

exports.deletePost = (req, res) => {
    Post.findOne({
        where: {
            idPost: req.params.id
        }
    })
        .then((foundPost) => {

            if (!foundPost) {
                return res.status(404).json({
                    error: "This post doesn't exist"
                })
            }
            const filename = foundPost.URLimage.split("/images/")[1];
            fs.unlink(`images/${filename}`, () => {
                foundPost.destroy();
                return res.status(200).json({
                    message : "Post successfuly deleted"
                })
            })
            
        })
        .catch((error) => {
            res.status(500).json({
                error: 'Internal server error',
                error
            })
        })
}; 