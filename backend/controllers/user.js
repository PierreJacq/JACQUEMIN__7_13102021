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
                    message : 'Utilisateur créé avec succès'
                }))
                
                .catch(error => res.status(400).json({
                    error : 'Bad request'
                })); 
        })
        .catch(error => res.status(500).json({
            error : 'Internal Server Error ' 
        }));
}; 