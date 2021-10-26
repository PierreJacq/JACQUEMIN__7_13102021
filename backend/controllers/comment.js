const moment = require('moment');
const Comment = require('../models/comment');
const Post = require('../models/Post');
const User = require('../models/User');

exports.createComment = (req, res) => {
    User.findOne({
            where: {
                idUser: req.body.userId
            }
        })
        .then((foundAuthor) => {
            if (!foundAuthor) {
                return res.status(404).json({
                    error: "This user doesn't exist"
                })
            }
            Post.findOne({
                    where: {
                        idPost: req.body.postId
                    }
                })
                .then((foundPost) => {
                    if (!foundPost) {
                        return res.status(404).json({
                            error: "This post doesn't exist"
                        })
                    }
                    Comment.create({
                            userId: foundAuthor.idUser,
                            postId: foundPost.idPost,
                            commentDate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                            commentText: req.body.commentText,
                            userFirstName: foundAuthor.firstName,
                            userLastName: foundAuthor.lastName
                        })
                        .then((comment) => {
                            res.status(200).json(comment)
                        })
                        .catch((error) => {
                            res.status(400).json({
                                error: 'Could not create new comment',
                                error
                            })
                        })
                })
                .catch(() => {
                    res.status(500).json({
                        error : "Internal server error"
                    })
                })
        })
        .catch((error) => {
            res.status(500).json({
                error,
                error: 'Internal server error'
            })
        })
};

exports.getAllComments = (req, res) => {
    Post.findOne({
            where: {
                idPost: req.body.postId
            }
        })
        .then((foundPost) => {
            if (!foundPost) {
                return res.status(404).json({
                    error: "Post doesn't exist"
                })
            }
            Comment.findAll({
                    where: {
                        postId: foundPost.idPost
                    }
                })
                .then((foundComments) => {
                    res.status(200).json(foundComments)
                })
                .catch((error) => {
                    res.status(500).json({
                        error,
                        error: "Internal server error"
                    })
                })
        })
        .catch((error) => {
            res.status(500).json({
                error,
                error: "Internal server error"
            })
        })
};

exports.modifyComment = (req, res) => {
    Comment.findOne({
            where: {
                commentId: req.body.commentId
            }
        })
        .then((foundComment) => {
            if (!foundComment) {
                return res.status(404).json({
                    error: "This comment doesn't exist"
                })
            }
            foundComment.update({
                    commentText: req.body.commentText
                })
                .then((updatedComment) => {
                    res.status(200).json(updatedComment)
                })
                .catch((error) => {
                    res.status(500).json({
                        error,
                        error: "Internal server error" 
                    })
                })
        })
        .catch((error) => {
            res.status(500).json({
                error,
                error: "Internal server error"
            })
        })
};

exports.deleteComment = (req, res) => {
    Comment.findOne({
        where : {
            commentId : req.body.commentId
        }
    })
        .then((foundComment) => {
            if (!foundComment) {
                return res.status(404).json({
                    error: "This comment doesn't exist"
                })
            }
            // ajouter ici une condition sur l'auteur ou l'admin, à gérer plus tard
            foundComment.destroy()
                .then(() => {
                    res.status(200).json({
                        message : "Comment sucessefuly deleted"
                    })
                })
                .catch((error) => {
                    res.status(500).json({
                        error,
                        error: "Internal server error"
                    })
                })
        })
        .catch((error) => {
            res.status(500).json({
                error,
                error: "Internal server error"
            })
        })
};