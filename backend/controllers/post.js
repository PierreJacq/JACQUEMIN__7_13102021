const moment = require('moment');
const fs = require('fs');
const {
    User,
    Post,
    Comment,
    Like
} = require('../models/index');
const checkAdminRights = require('../utils/checkAdminRights');
const checkAuthorId = require('../utils/checkAuthorId');


exports.getAllPosts = (req, res) => {
    Post.findAll({
            include: [{
                    model: User
                },
                {
                    model: Comment
                },
                {
                    model: Like
                }
            ]
        })
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
    const isRequestFromUser = checkAuthorId(req);
    User.findOne({
            where: {
                id: req.body.authorId
            }
        })
        .then((user) => {
            if (!user) {
                return res.status(404).json({
                    error: "This user doesn't exist"
                })
            }
            if (isRequestFromUser == user.id) {
                Post.create({
                        UserId: user.id,
                        creationDate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                        updateDate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                        title: req.body.title,
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
            } else {
                return res.status(401).json({
                    error
                })
            }
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
                id: req.params.id
            },
            include: {
                model: User
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
    const isRequestFromUser = checkAuthorId(req);
    const postObject = req.file ? {
        ...req.body,
        URLimage: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : {
        ...req.body
    };
    Post.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((foundPost) => {
            if (!foundPost) {
                return res.status(404).json({
                    error: "This post doesn't exist"
                })
            }
            if (isRequestFromUser == foundPost.UserId) {
                foundPost.update({
                        updateDate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                        ...postObject
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
            } else {
                return res.status(401).json({
                    error
                })
            }
        })
        .catch((error) => {
            res.status(500).json({
                error: 'Internal server error',
                error
            })
        })
}

exports.deletePost = (req, res) => {
    const isRequestFromAdmin = checkAdminRights(req);
    const isRequestFromUser = checkAuthorId(req);
    Post.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((foundPost) => {
            if (!foundPost) {
                return res.status(404).json({
                    error: "This post doesn't exist"
                })
            }
            if (isRequestFromUser == foundPost.UserId || isRequestFromAdmin === true) {
                const filename = foundPost.URLimage.split("/images/")[1];
                fs.unlink(`images/${filename}`, () => {
                    foundPost.destroy();
                    return res.status(200).json({
                        message: "Post successfuly deleted"
                    })
                })
            } else {
                return res.status(401).json({
                    error
                })
            }
        })
        .catch((error) => {
            res.status(500).json({
                error: 'Internal server error',
                error
            })
        })
};