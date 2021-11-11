const moment = require('moment');
const {User, Post, Comment, Like} = require('../models/index')

exports.createComment = (req, res) => {
    User.findOne({
            where: {
                id: req.body.userId
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
                        id: req.body.postId
                    }
                })
                .then((foundPost) => {
                    if (!foundPost) {
                        return res.status(404).json({
                            error: "This post doesn't exist"
                        })
                    }
                    Comment.create({
                            UserId: foundAuthor.id,
                            PostId: foundPost.id,
                            commentDate: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                            commentText: req.body.commentText
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
                id: req.body.postId
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
                        id: foundPost.idPost
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
                id: req.body.commentId
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
            id : req.body.commentId
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