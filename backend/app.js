//--------------------------------------------------------------
//-------------- PACKAGES
//--------------------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

//--------------------------------------------------------------
//--------------  TEST DATABASE
//-------------------------------------------------------------- 

const sequelize = require('./config/database');

sequelize.authenticate()
    .then(() => console.log('Connexion à AWS réussie !')) 
    .catch(() => console.log('Connexion à AWS échouée !')); 

//--------------------------------------------------------------
//--------------  HEADERS
//--------------------------------------------------------------
const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//--------------------------------------------------------------
//-------------- ROUTES
//--------------------------------------------------------------

// Route users
const userRoutes = require ('./routes/user')
app.use('/api/user', userRoutes)

// Route images
const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));

// Route post
const postRoutes = require ('./routes/post')
app.use('/api/post', postRoutes)

// Route Comment
const commentRoutes = require ('./routes/comment')
app.use('/api/comment', commentRoutes)

// Route Like
const likeRoutes = require ('./routes/like')
app.use('/api/like', likeRoutes)

module.exports = app;