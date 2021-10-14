const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = User.create({
                    login: req.body.login,
                    password: hash,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    URLprofile: req.body.URLprofile,
                    birthDate: req.body.birthDate,
                    isAdmin: false
                })
                .then((user) => res.status(201).json({
                    idUser: user.idUser,
                    message: 'New user created !'
                }))

                .catch(error => res.status(400).json({
                    error: 'Bad request'
                }));
        })
        .catch(error => res.status(500).json({
            error: 'Internal Server Error '
        }));
};


exports.login = (req, res) => {
    var submittedLogin = req.body.login;

    User.findOne({
            where: {
                login: submittedLogin
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
                            error: 'Mot de passe incorrect !'
                        });
                    }
                    res.status(200).json({
                        message: 'User connected',
                        idUser: user.idUser,
                        token: jwt.sign({
                                idUser: user.id
                            },
                            process.env.LOGIN_TOKEN, {
                                expiresIn: '24h'
                            }
                        )
                    });
                })
                .catch(error => res.status(500).json({
                    error: 'ici'
                }));
        })
        .catch(error => res.status(500).json({
            error
        }));
};

exports.getAllUsers = (req, res) => {
    User.findAll()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch((error) => {
            res.status(400).json({
                error: 'Pas fonctionné'
            });
        })
};