const bcrypt = require('bcrypt')
const {User, Post, Comment, Like} = require('../models/index')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const fs = require('fs');

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.create({
                    login: req.body.login,
                    password: hash,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    URLprofile: req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : `${req.protocol}://${req.get("host")}/images/sasha.png`,
                    birthDate: req.body.birthDate,
                    isAdmin: false
                })
                .then((user) => {
                    res.status(201).json({
                        id: user.id,
                        message: 'New user created !'
                    })
                })
                .catch((error) => {
                    res.status(400).json({
                        error,
                        error: "Bad request"
                    })
                })
        })
        .catch((error) => {
            res.status(500).json({
                error
            })
        })
};

exports.login = (req, res) => {
    User.findOne({
            where: {
                login: req.body.login
            }
        })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    error: 'User not found'
                });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({
                            error: 'Incorrect password !'
                        });
                    }
                    res.status(200).json({ 
                        message: 'User connected',
                        id: user.id,
                        token: jwt.sign({
                                id: user.id
                            },
                            process.env.LOGIN_TOKEN, {
                                expiresIn: '24h'
                            }
                        )
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        error
                    })
                });
        })
        .catch((error) => {
            res.status(500).json({
                error
            })
        });
};

exports.getAllUsers = (req, res) => {
    User.findAll()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch((error) => {
            res.status(400).json({
                error
            });
        })
};

exports.getOneUser = (req, res) => {
    User.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((user) => {
            res.status(200).json(user)
        })
        .catch((error) => {
            res.status(400).json({
                error: 'Bad request'
            })
        })
};

exports.modifyOneUser = (req, res) => {
    const userObject = req.file ? {
        ...req.body,
        URLprofile: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body        
    };
    User.findOne({
            where: {
                id: req.params.id
            }
        })
        .then((foundUser) => {
            if (!foundUser) {
                return res.status(404).json({
                    error: "This user doesn't exist"
                })
            }
            foundUser.update({
                    ...userObject,

                })
                .then((user) => {
                    res.status(200).json({
                        user,
                        userObject
                    })
                })
                .catch((error) => {
                    res.status(505).json({
                        error: 'Internal server error'
                    })
                })
        })
        .catch((error) => {
            res.status(400).json({
                error,
                error: 'Bad request'
            })
        })
};

exports.deleteOneUser = (req, res) => {
    User.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            if (user) {
                const filename = user.URLprofile.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    User.destroy({
                            where: {
                                id: req.params.id
                            }
                        })
                        .then(() => res.status(200).json({
                            message: 'User deleted'
                        }))
                        .catch(error => res.status(400).json({
                            error
                        }));
                });
            } else {
                return res.status(404).json({
                    error: "User can't be found"
                })
            }
        })
        .catch((error) => {
            res.status(500).json({
                error: 'Internal server error'
            })
        });
};