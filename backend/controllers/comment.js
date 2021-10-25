const moment = require('moment');
const Comment = require('../models/comment');
const Post = require('../models/Post');
const User = require('../models/User');

exports.createComment = (req, res) => {
    console.log("on arrive bien jusque là")
    User.findOne({
            where: {
                idUser: req.body.userId
            }
        })
        .then((foundAuthor) => {
            console.log("on arrive bien jusque ici")
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
                                error :'Could not create new comment',
                                error
                            })
                        })
                })
                .catch((error) => {
                    res.status(500).json({
                        error
                    })
                })
        })
        .catch((error) => {
            console.log(req.body.userId)
            res.status(500).json({
                error,
                error: 'Ici'
            })
        })
};