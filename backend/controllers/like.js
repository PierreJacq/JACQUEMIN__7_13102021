const Like = require('../models/like')
const Post = require('../models/Post');
const User = require('../models/User');

exports.addLike = (req, res) => {
    User.findOne({
            where: {
                idUser: req.body.user
            }
        })
        .then((foundUser) => {
            if (!foundUser) {
                return res.status(404).json({
                    error: "This user doesn't exist"
                })
            }
            Post.findOne({
                    where: {
                        idPost: req.body.post
                    }
                })
                .then((foundPost) => {
                    if (!foundPost) {
                        return res.status(404).json({
                            error: "This post doesn't exist"
                        })
                    }
                    Like.create({
                            user: foundUser.idUser,
                            post: foundPost.idPost
                        })
                        .then(() => {
                            res.status(200).json({
                                message: "Like successfuly added"
                            })
                        })
                        .catch(() => {
                            res.status(400).json({
                                error: "Bad request : this user already likes the post"
                            })
                        })
                })
                .catch(() => {
                    res.status(404).json({
                        error: "This post doesn't exist"
                    })
                })
        })
        .catch(() => {
            res.status(500).json({
                error: "Internal server error"
            })
        })
};

exports.getPostLikes = (req, res) => {
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
            Like.findAll({
                    where: {
                        post: req.params.id
                    }
                })
                .then((likes) => {
                    if (likes.length == 0) {
                        return res.status(200).json({
                            message: "This post has no likes"
                        })
                    }
                    res.status(200).json(likes)
                })
                .catch(() => {
                    res.status(500).json({
                        error: "là"
                    })
                })
        })
        .catch(() => {
            res.status(500).json({
                error: "Internal server error"
            })
        })
};

exports.deleteLike = (req, res) => {
    // A voir si ma façon de traiter l'autorisation est correcte. La construction d'URL est un brin funky aussi
    Like.destroy({
            where: {
                user: req.params.user,
                post: req.params.post
            }
        })
        .then(() => {
            res.status(200).json({
                message: 'like successfuly deleted'
            })
        })
        .catch(() => {
            res.status(500).json({
                error: "Internal server error"
            })
        })
}