const moment = require('moment');
const {
    User,
    Post,
    Comment,
    Like
} = require('../models/index');
const checkAdminRights = require('../utils/checkAdminRights');
const checkAuthorId = require('../utils/checkAuthorId');


exports.createComment = (req, res) => {
    const isRequestFromUser = checkAuthorId(req);
    User.findOne({
            where: {
                id: req.body.UserId
            }
        })
        .then((foundAuthor) => {
            if (!foundAuthor) {
                return res.status(404).json({
                    error: "This user doesn't exist"
                })
            }
            if (isRequestFromUser == foundAuthor.id) {
                Post.findOne({
                        where: {
                            id: req.body.PostId
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
                                res.status(200).json({
                                    comment,
                                    message: "Comment added !"
                                })
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
                            error: "Internal server error"
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
                error,
                error: 'Internal server error'
            })
        })
}; 

exports.getAllComments = (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((foundPost) => {
            if (!foundPost) {
                return res.status(404).json({
                    Message: "Post doesn't exist"
                })
            }
            Comment.findAll({
                    where: {
                        PostId: foundPost.id
                    },
                    include: [{
                        model: User
                    }]
                })
                .then((foundComments) => {
                    res.status(200).json(foundComments)
                })
                .catch((error) => {
                    res.status(501).json({
                        error,
                        error: "Internal server error"
                    })
                })
        })
        .catch((error) => {
            res.status(502).json({
                message: "Non",
                error: "Internal server error"
            })
        })
};

exports.modifyComment = (req, res) => {
    const isRequestFromUser = checkAuthorId(req);
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
            if (isRequestFromUser == foundComment.UserId) {
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
            } else {
                return res.status(401).json({
                    error
                })
            }
        })
        .catch((error) => {
            res.status(500).json({
                error,
                error: "Internal server error"
            })
        })
};

exports.deleteComment = (req, res) => {
    const isRequestFromUser = checkAuthorId(req);
    Comment.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((foundComment) => {
            if (isRequestFromUser == foundComment.UserId){
                foundComment.destroy();
                return res.status(200).json({
                    message: "Post successfuly deleted"
                })
            } else {
                return res.status(401).json({
                    error
                })
            }
        })
        .catch((error) => {
            res.status(400).json({
                error: 'Could not delete new comment',
                error
            })
        })
}